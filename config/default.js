const clientId = '909603359091-o6l8nb673iamoo1lpqheuevhtcd3hu2j.apps.googleusercontent.com';
const apiKey = 'AIzaSyBdFU4f0JwtJtq6FnQ4Fn41bcQbYkdfg_U';
const authConfig = {
  clientId,
  androidClientId: clientId,
  apiKey,
  scopes: [
    'openid',
    'email',
    'profile',
    "https://www.googleapis.com/auth/contacts.readonly",
    "https://www.googleapis.com/auth/script.external_request",
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
