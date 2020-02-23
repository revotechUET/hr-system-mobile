import axios from 'axios';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import Toast from 'react-native-root-toast';
import * as Google from './GoogleAuthService';
import StorageService from './StorageService';

const config = require('../../config/default.js');
const { authConfig, baseUrl, adminBaseUrl } = config;

const AuthStorageKey = '@OsamHr:GoogleOAuth';

function makeCancelable(promise) {
  let isCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val => (isCanceled ? reject({ isCanceled }) : resolve(val)))
      .catch(error => (isCanceled ? reject({ isCanceled }) : reject(error)));
  });
  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}

function useCancellable() {
  const promises = useRef([]);
  useEffect(() => {
    return () => {
      promises.current.forEach(p => p.cancel());
      promises.current = [];
    };
  }, []);
  function cancellablePromise(p) {
    const cPromise = makeCancelable(p);
    promises.current.push(cPromise);
    return cPromise.promise;
  }
  return cancellablePromise;
}

class ApiService {
  constructor() {
    (async () => {
      const auth = await this.getCachedAuthAsync();
      if (auth) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
        // axios.defaults.headers.common['scopes'] = authConfig.scopes.join(' ');
      }
      axios.defaults.baseURL = baseUrl;
    })();

    /// debug
    // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
    window.ApiService = this;
    window.StorageService = StorageService;
  }

  useCancellable = useCancellable;

  async post(fnName, data, config = {}) {
    try {
      const res = await axios.post('', {
        function: fnName,
        parameters: data,
        // sessionState: string,
      }, config);
      if (res.data.error) throw res.data.error;
      return res.data.response.result;
    } catch (error) {
      console.log(error);
      // token expired
      if (error.response && error.response.status === 401) {
        console.log('refresh access token');
        const auth = await this.getCachedAuthAsync(false);
        await this.refreshAccessToken(auth);
        return this.post.call(this, fnName, data, config);
      }
      if (!config.notThrow) {
        let { details: [e] = [{}] } = error;
        if (!e['@type'] || !e['@type'].includes('ExecutionError')) {
          e.errorMessage = 'Lỗi kết nối!'
        }
        Toast.show(e.errorMessage);
      } else {
        throw error;
      }
    }
  }
  async postAdmin(fnName, data, config) {
    return this.post(fnName, data, { baseURL: adminBaseUrl,...config})
  }

  //#region auth
  async login() {
    try {
      const res = await Google.logInAsync(authConfig);
      const { type, user, auth } = res;
      if (type === 'success') {
        await StorageService.set('user', user);
        await this.setAuthAsync(auth);
      }
      return res;
    } catch (e) {
      console.error(e);
      Toast.show('Đăng nhập thất bại');
      return { type: 'fail' }
    }
  }
  async setAuthAsync(authState) {
    if (authState) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.accessToken}`;
    }
    return StorageService.set(AuthStorageKey, authState);
  }
  async getCachedAuthAsync(refresh = true) {
    let authState = await StorageService.get(AuthStorageKey);
    if (!refresh) return authState;
    if (authState) {
      if (this.checkIfTokenExpired(authState)) {
        authState = await this.refreshAccessToken(authState);
      }
      return authState;
    }
    return null;
  }
  checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }
  refreshAccessToken = debounce(async ({ refreshToken, ...prevAuth }) => {
    const auth = await Google.refreshAuthAsync({ config: authConfig, refreshToken });
    const newAuth = { ...prevAuth, ...auth, refreshToken: auth.refreshToken || refreshToken };
    await this.setAuthAsync(newAuth);
    console.log('token refreshed', newAuth);
    return newAuth;
  }, 5000, { leading: true, trailing: false });
  async logout() {
    try {
      const auth = await this.getCachedAuthAsync(false);
      if (!auth) return;
      await Google.logOutAsync({
        accessToken: auth.accessToken,
        ...authConfig,
      });
      this.setAuthAsync(null);
    } catch (e) {
      Toast.show('Đăng xuất thất bại');
    }
  }
  async googleUserInfo() {
    const auth = await this.getCachedAuthAsync();
    return Google.userInfoAsync(auth);
  }
  async userInfo(payload) {
    return this.post('userInfo', payload);
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
  async sendLeaveRequest(payload) {
    return this.post('leaveAdd', payload);
  }
  async getLeaveRequest(payload) {
    return this.post('leaveGet', payload);
  }
  async listUserLeaveRequest(payload) {
    return this.post('leaveList', payload);
  }

  //#region setting
  async getSetting() {
    return this.post('getSetting');
  }
  //#endregion

  //#region admin
  async listLeaveRequest(payload) {
    return this.postAdmin('leaveList', payload);
  }
  async approveLeaveRequest(payload) {
    return this.postAdmin('leaveApprove', payload);
  }
  async rejectLeaveRequest(payload) {
    return this.postAdmin('leaveReject', payload);
  }
  //#endregion
  async getPayrollThisMonth() {
    return this.post('getPayrollThisMonth');
  }
}

export default new ApiService();
