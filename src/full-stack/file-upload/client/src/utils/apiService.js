import axios from 'axios';

function errorHandler(error) {
  if (error.response.data.error) throw new Error(`ApiError: ${error.response.data.error}`);
  else throw new Error(`ApiError: ${error.message}`);
}

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_BACKEND_URI,
      timeout: 10000,
    });
    this.api.interceptors.request.use(
      (config) => {
        const storedAuthToken = sessionStorage.getItem('jwt');
        if (storedAuthToken) config.headers.Authorization = `Bearer ${storedAuthToken}`;

        // console.log('CONFIG method: ', config.method);
        // console.log('CONFIG url: ', config.url);
        // console.log('CONFIG data: ', config.data);
        // console.log('CONFIG Auth: ', config.headers.Authorization);

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.api.interceptors.response.use(
      (response) => {
        // console.log('RESPONSE date: ', response.headers.date);
        // console.log('RESPONSE method: ', response.request._method);
        // console.log('RESPONSE status: ', response.status);
        // console.log('RESPONSE url: ', response.request._url);
        // console.log('RESPONSE data: ', response.data);

        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
  

  // NOTE: auth routes
  async signup(userData) {
    try {
      const apiResponse = await this.api.post('/auth/signup', userData);
      return apiResponse.data;
    } catch (error) {
      errorHandler(error);
    }
  }
  async login(userData) {
    try {
      const apiResponse = await this.api.post('/auth/login', userData);
      return apiResponse.data;
    } catch (error) {
      errorHandler(error);
    }
  }
  async verify() {
    try {
      const apiResponse = await this.api.get('/auth/verify');
      return apiResponse.data;
    } catch (error) {
      errorHandler(error);
    }
  }

  // NOTE: file routes
  async uploadAvatar(uploadData) {
    try {
      const apiResponse = await this.api.post('/file/upload', uploadData);
      return apiResponse.data;
    } catch (error) {
      errorHandler(error);
    }
  }
  async storeAvatar(storeData) {
    try {
      const apiResponse = await this.api.post('/file/store', storeData);
      return apiResponse.data;
    } catch (error) {
      errorHandler(error);
    }
  }
}

export default new ApiService();
