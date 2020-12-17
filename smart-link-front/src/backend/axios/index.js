import axios from 'axios';

const API_URL = 'http://localhost:3000';

const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

securedAxiosInstance.interceptors.request.use((config) => {
  const method = config.method.toUpperCase();
  if (method !== 'OPTIONS' && method !== 'GET') {
    // eslint-disable-next-line
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf,
    };
  }
  return config;
});

securedAxiosInstance.interceptors.response.use(null, (error) => {
  if (error.response && error.response.config && error.response.status === 401) {
    return plainAxiosInstance.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then((response) => {
        localStorage.csrf = response.data.csrf;
        localStorage.signedIn = true;

        const retryConfig = error.response.config;
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf;
        return plainAxiosInstance.request(retryConfig);
        // eslint-disable-next-line
      }).catch((error) => {
        delete localStorage.csrf;
        delete localStorage.signedIn;

        location.replace('/');
        return Promise.reject(error);
      });
  // eslint-disable-next-line
  } else {
    return Promise.reject(error);
  }
});

export { securedAxiosInstance, plainAxiosInstance };
