"use strict";

import axios from "axios";
// import store from 'store2';
// import { Message } from 'element-ui'
import router from '../router/index';
let _congfig={
  // baseURL: process.env.NODE_ENV_API_URL,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  baseURL: process.env.NODE_ENV === 'development' ? process.env.NODE_ENV_API_L_URL : process.env.VUE_APP_API
}
const _axios = axios.create(_congfig);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.token;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    const resData = response.data;
    if (resData.code === 0) {
      return resData.data;
    } else {

      if (resData.code === 403 || resData.code > 1000 && resData.code <= 1010) {
        router.replace({ path: '/login', query: { redirect: router.currentRoute.path } })
      }
      // resData.message && Message.error(resData.message);
    }
    return Promise.reject(resData);
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


export const $ajax = async (methods = 'get', ...args) => {
  const res = [null, null];
  try {
    res[1] = await _axios[methods](...args);
  } catch (error) {
    res[0] = error;
  }
  return res;
}

export const $get = (url, config = {}) => {
  return $ajax('get', url, config);
}

export const $post = (url, data = {}, config = {}) => {
  return $ajax('post', url, data, config);
}
export const $put = (url, data = {}, config = {}) => {
  return $ajax('put', url, data, config);
}

export const $del = (url, data = {}, config = {}) => {
  return $ajax('delete', url, data, config);
}

export default _axios;
// Plugin.install = function(Vue, options) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };

// Vue.use(Plugin)

// export default Plugin;
