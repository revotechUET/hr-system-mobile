import axios from 'axios';
import Toast from 'react-native-root-toast';
import * as Google from './GoogleAuthService';
import StorageService from './StorageService';


const config = require('../../config/default.js');
const { authConfig, baseUrl } = config;

const AuthStorageKey = '@OsamHr:GoogleOAuth';

class ApiService {
  constructor() {
    (async () => {
      const auth = await this.getCachedAuthAsync();
      if (auth) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
        axios.defaults.headers.common['scopes'] = authConfig.scopes.join(' ');
      }
      axios.defaults.baseURL = baseUrl;
    })();

    /// debug
    // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
    window.ApiService = this;
    window.StorageService = StorageService;
  }

  async post(fnName, data, config = {}) {
    try {
      const res = await axios.post('', {
        function: fnName,
        parameters: data,
        // sessionState: string,
      }, config);
      if (res.data.error) throw res;
      return res.data.response.result;
    } catch (error) {
      console.log(error);
      if (config.throw) {
        throw error;
      } else {
        let msg = error.response && error.response.data && error.response.data.reason || 'Lỗi kết nối!';
        Toast.show(msg);
      }
    }
  }

  //#region auth
  async getUser() {
    return StorageService.get('user');
  }
  async login() {
    try {
      const res = await Google.logInAsync(authConfig);
      const { type, user, auth } = res;
      if (type === 'success') {
        await StorageService.set('user', user);
        await this.cacheAuthAsync(auth);
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
      }
      return res;
    } catch (e) {
      Toast.show('Đăng nhập thất bại');
      return { type: 'fail' }
    }
  }
  async cacheAuthAsync(authState) {
    return StorageService.set(AuthStorageKey, authState);
  }
  _refreshAccessTokenTimeout = null;
  async getCachedAuthAsync(refresh = true) {
    const authState = await StorageService.get(AuthStorageKey);
    if (authState) {
      if (!refresh) return authState;
      if (this.checkIfTokenExpired(authState)) {
        return this.refreshAccessToken(authState);
      } else {
        if (this._refreshAccessTokenTimeout) {
          clearTimeout(this._refreshAccessTokenTimeout);
        }
        this._refreshAccessTokenTimeout = setTimeout(() => {
          this.refreshAccessToken(authState);
        }, new Date(authState.accessTokenExpirationDate) - new Date() - 1000);
        return authState;
      }
    }
    return null;
  }
  checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }
  async refreshAccessToken({ refreshToken }) {
    const auth = await Google.refreshAuthAsync({ config: authConfig, refreshToken });
    await this.cacheAuthAsync(auth);
    return auth;
  }
  async logout() {
    try {
      const auth = await this.getCachedAuthAsync(false);
      if (!auth) return;
      await Google.logOutAsync({
        accessToken: auth.accessToken,
        ...authConfig,
      });
      this.cacheAuthAsync(null);
      // await StorageService.dropStorage();
    } catch (e) {
      Toast.show('Đăng xuất thất bại');
    }
  }
  async userInfo() {
    const auth = await this.getCachedAuthAsync();
    return Google.userInfoAsync(auth);
  }
  //#endregion

  //#region checking
  async checkIn() {
    return this.post('checkin');
  }
  async checkOut() {
    return this.post('checkout');
  }
  async checkingStatus() {
    return this.post('checkingStatus');
  }
  async listCheckIn(payload) {
    return this.post('checkingList', payload);
  }
  async reportCheckin({ id, reportContent }) {
    return this.post('checkingReport', { id, reportContent });
  }
  //#endregion

  //#region leave
  async sendLeaveRequest(payload, config) {
    return this.post('leaveAdd', payload, config);
  }
  async getLeaveRequest(payload, config) {
    return this.post('leaveGet', payload, config);
  }
  async listUserLeaveRequest(payload) {
    return this.post('leaveListByUser', payload);
  }
  // admin
  async listAllLeaveRequest(payload) {
    return this.post('leaveList', payload);
  }
  async approveLeaveRequest(payload) {
    return this.post('leaveApprove', payload);
  }
  async rejectLeaveRequest(payload) {
    return this.post('leaveReject', payload);
  }
  //#endregion
}

export default new ApiService();
