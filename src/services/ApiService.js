import * as Google from './GoogleAuthService';
import StorageService from './StorageService';

const authConfig = {
  androidClientId: '909603359091-o6l8nb673iamoo1lpqheuevhtcd3hu2j.apps.googleusercontent.com',
  additionalParameters: {
    hosted_domain: 'esstar.com.vn'
  }
}

class ApiService {
  _auth = null;

  constructor() {
    (async () => {
      this._auth = await this.getAuth();
    })()
  }

  async getAuth() {
    return StorageService.get('auth');
  }
  async getUser() {
    return StorageService.get('user');
  }

  async login() {
    try {
      const res = await Google.logInAsync(authConfig)
      const { type, user, ...auth } = res;
      if (type === 'success') {
        await StorageService.set('user', user);
        await StorageService.set('auth', auth);
        this._auth = auth;
      }
      return res;
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  }

  async logout() {
    try {
      await Google.logOutAsync({
        accessToken: this._auth.accessToken,
        ...authConfig,
      });
      this._auth = null;
      await StorageService.dropStorage();
    } catch ({ message }) {
      alert('logout: Error:' + message);
    }
  }
}

export default new ApiService();
