import Constants from 'expo-constants';

const isInExpo = Constants.appOwnership === 'expo';

const authConfig = {
  clientId: '662965188559-dirqcuolk4i6nuaed5onhfh68r4l3tq8.apps.googleusercontent.com',
  androidStandaloneAppClientId: '662965188559-gkfith6nn2op1cpuqlhmorg8p6sfequv.apps.googleusercontent.com',
  scopes: [
    'openid',
    'email',
    'profile',
    "https://www.googleapis.com/auth/calendar",
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

const devBaseUrl = 'https://script.googleapis.com/v1/scripts/AKfycbynU9fSM_fOUG8HKZ0SPOlA0IoLDOiL09xa4JYAZdn-:run';
const prodBaseUrl = 'https://script.googleapis.com/v1/scripts/AKfycbzFZeNaf1sXNRedlrZ-_zy_PzLTbanvlD4hRwr5oAEgyNsLIgxtWMBekCoBvftKX4aN7A:run';
const baseUrl = isInExpo ? devBaseUrl : prodBaseUrl;


module.exports = {
  authConfig,
  baseUrl
}
