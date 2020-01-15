import { CodedError } from '@unimodules/core';
import * as AppAuth from 'expo-app-auth';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import StorageService from './StorageService';

const isInExpo = Constants.appOwnership === 'expo';

function getPlatformGUID(config) {
  const { clientId } = config;

  const iosClientId =
    Constants.appOwnership === 'standalone' ? config.iosStandaloneAppClientId : config.iosClientId;
  const androidClientId = isInExpo ? config.androidClientId : config.androidStandaloneAppClientId;

  const platformClientId =
    Platform.select({
      ios: iosClientId,
      android: androidClientId,
      default: config.clientId,
    }) || clientId;

  if (
    typeof iosClientId === 'string' &&
    typeof androidClientId === 'string' &&
    iosClientId === androidClientId
  ) {
    throw new CodedError(
      'ERR_GOOGLE_CONFIG',
      'Keys for Android and iOS cannot be the same value. Ensure you are linking the client IDs matching the given platforms in the Google APIs console: https://console.developers.google.com/apis/credentials'
    );
  }

  const guid = guidFromClientId(platformClientId);
  return guid;
}

const PROJECT_NUMBER_LENGTH = 11;

const PROJECT_ID_LENGTH = 32;

function isValidGUID(guid) {
  const components = guid.split('-');
  if (components.length !== 2) {
    return {
      isValid: false,
      reason: `\`${guid}\` must be a string of numbers and an alphanumeric string ${PROJECT_ID_LENGTH} characters long, joined with a hyphen.`,
    };
  }
  const projectNumber = components[0];
  const projectId = components[1];
  if (isNaN(+projectNumber)) {
    const hashedProjectId = Array(PROJECT_ID_LENGTH).fill('x');
    return {
      isValid: false,
      reason: `\`${projectNumber}-${hashedProjectId}\` project number must be a string of numbers.`,
    };
  }
  if (!projectId.match('^[a-zA-Z0-9]+$')) {
    const hashedProjectNumber = Array(projectNumber.length).fill('x');
    return {
      isValid: false,
      reason: `\`${hashedProjectNumber}-${projectId}\` project ID must be an alphanumeric string ${PROJECT_ID_LENGTH} characters long.`,
    };
  }

  return { isValid: true };
}

function guidFromClientId(clientId) {
  const clientIdComponents = clientId.split('.').filter(component => component.includes('-'));

  const guid = clientIdComponents[0];
  const { isValid, reason } = isValidGUID(guid);
  if (!isValid) {
    throw new CodedError(
      'ERR_GOOGLE_GUID',
      reason + ' Please ensure you copied the client ID correctly.'
    );
  }

  return guid;
}

export async function logInAsync(config) {
  const userDefinedScopes = config.scopes || [];
  /* Add the required scopes for returning profile data. */
  const requiredScopes = [...userDefinedScopes, 'profile', 'email', 'openid'];
  /* Remove duplicates */
  const scopes = [...new Set(requiredScopes)];

  const guid = getPlatformGUID(config);

  const clientId = `${guid}.apps.googleusercontent.com`;
  let redirectUrl = config.redirectUrl
    ? config.redirectUrl
    : `${AppAuth.OAuthRedirect}:/oauth2redirect/google`;
  try {
    const logInResult = await AppAuth.authAsync({
      issuer: 'https://accounts.google.com',
      scopes,
      redirectUrl,
      clientId,
      additionalParameters: {
        prompt: 'select_account',
        ...(config.additionalParameters || {})
      },
    });

    // Web login only returns an accessToken so use it to fetch the same info as the native login does.
    const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${logInResult.accessToken}` },
    });
    const userInfo = await userInfoResponse.json();

    return {
      type: 'success',
      accessToken: logInResult.accessToken,
      idToken: logInResult.idToken,
      refreshToken: logInResult.refreshToken,
      user: {
        id: userInfo.id,
        name: userInfo.name,
        givenName: userInfo.given_name,
        familyName: userInfo.family_name,
        photoUrl: userInfo.picture,
        email: userInfo.email,
      },
    };
  } catch (error) {
    if (error.message.toLowerCase().indexOf('user cancelled') > -1) {
      return { type: 'cancel' };
    }
    throw error;
  }
}

export async function logOutAsync({ accessToken, ...inputConfig }) {
  const guid = getPlatformGUID(inputConfig);

  const clientId = `${guid}.apps.googleusercontent.com`;

  const config = {
    issuer: 'https://accounts.google.com',
    clientId,
  };

  return await AppAuth.revokeAsync(config, {
    token: accessToken,
    isClientIdProvided: !!clientId,
  });
}
