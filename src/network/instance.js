import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {decryptData} from '../components/atoms/crypto';

const instance = axios.create({});

const requestHandler = async request => {
  let token = await AsyncStorage.getItem('accessToken');
  if (token) {
    request.headers.Authorization = 'Bearer ' + token;
  }
  return request;
};

const responseHandler = response => {
  return response;
};

const errorHandler = error => {
  return Promise.reject(error);
};

instance.interceptors.request.use(
  request => requestHandler(request),
  error => errorHandler(error),
);

instance.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);

export default instance;
