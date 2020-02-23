import Constants from 'expo-constants';

const isInExpo = Constants.appOwnership === 'expo';

const authConfig = {
  clientId: '116791155078-u2nn02fui1fkgh1lmah2t8lvptaujlkj.apps.googleusercontent.com',
  androidStandaloneAppClientId: '116791155078-51hd1n84eokjl0ins77dpighcutk3i7u.apps.googleusercontent.com',
  scopes: [
    'openid',
    'email',
    'profile',
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/script.external_request",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
  additionalParameters: {
    prompt: 'select_account',
    hosted_domain: 'esstar.com.vn',
    include_granted_scopes: true,
  }
}

const devBaseUrl = 'https://script.googleapis.com/v1/scripts/AKfycbxDyefFGXnzgZxSXTiIFps6dkpVr0cDR9NTrvvadfY:run';
const prodBaseUrl = 'https://script.googleapis.com/v1/scripts/AKfycbxq2yjwX4RpfLkP6m00vDMIK9nT0qK1fdo42pVrI6zv6PlDy9k:run';
const baseUrl = isInExpo ? devBaseUrl : prodBaseUrl;
const adminBaseUrl = 'https://script.googleapis.com/v1/scripts/AKfycbwhpiGHPYA5DjWRM9TC-QWsiWCGHLxYy4YQM4av0RUS:run';


module.exports = {
  authConfig,
  baseUrl,
  adminBaseUrl
}
