const clientId = '116791155078-u2nn02fui1fkgh1lmah2t8lvptaujlkj.apps.googleusercontent.com';
const authConfig = {
  clientId,
  androidClientId: clientId,
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

// const baseUrl = process.env.BASE_URL || 'http://192.168.17.71:3000';
const baseUrl = 'https://script.googleapis.com/v1/scripts/AKfycbxDyefFGXnzgZxSXTiIFps6dkpVr0cDR9NTrvvadfY:run';

module.exports = {
  clientId,
  authConfig,
  baseUrl
}
