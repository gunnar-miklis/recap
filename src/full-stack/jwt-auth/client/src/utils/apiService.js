import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_BACKEND_URI,
      timeout: 10000,
    });

    this.api.interceptors.request.use(
      (config) => {
        const storedJWT = sessionStorage.getItem('authToken');
        if (storedJWT) config.headers.Authorization = `Bearer ${storedJWT}`;

        // console.log('CONFIG method: ', config.method);
        // console.log('CONFIG url: ', config.url);
        // console.log('CONFIG data: ', config.data);
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

  async signup(userData) {
    try {
      const apiResponse = await this.api.post('/auth/signup', userData);
      return apiResponse.data;
    } catch (error) {
      return { error: `ApiError: ${error.response.data.error}` };
    }
  }

  async login(userData) {
    try {
      const apiResponse = await this.api.post('/auth/login', userData);
      return apiResponse.data;
    } catch (error) {
      return { error: `ApiError: ${error.response.data.error}` };
    }
  }

  async verify() {
    try {
      const apiResponse = await this.api.get('/auth/verify');
      return apiResponse.data;
    } catch (error) {
      return { error: `ApiError: ${error.response.data.error}` };
    }
  }

  async delete(userData) {
    try {
      const apiResponse = await this.api.delete('/delete', { data: userData }); // COMMENT: for axios.delete() needs to be sent as "data" property (unlike axios.post() which does it by default)
      return apiResponse.data;
    } catch (error) {
      return { error: `ApiError: ${error.response.data.error}` };
    }
  }

  async getCampuses() {
    try {
      const apiResponse = await this.api.get('/campuses');
      return apiResponse.data;
    } catch (error) {
      return { error: `ApiError: ${error.response.data.error}` };
    }
  }
}

export default new ApiService();
