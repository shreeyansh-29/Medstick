import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {HTTP_STATUS_CODES, serverErrors} from '../constants/statusCodes';
// import {decryptData} from '../components/atoms/crypto';

const instance = axios.create({
  timeout: 10000,
});

const requestHandler = async request => {
  let token = await AsyncStorage.getItem('accessToken');
  if (token) {
    request.headers.Authorization = 'Bearer ' + token;
  }
  return request;
};

const responseHandler = response => {
  const data = response.data;
  if (!data || response.status === HTTP_STATUS_CODES.noContent) {
    return Promise.resolve({});
  }
  return Promise.resolve(response);
};

const errorHandler = error => {
  let errorMessage = serverErrors.SERVER_ERROR;
  if (error.response) {
    const {status} = error.response;
    if (status === HTTP_STATUS_CODES.notFound) {
      errorMessage = serverErrors.NOT_FOUND;
    } else if (status === HTTP_STATUS_CODES.forbidden) {
      errorMessage = serverErrors.FORBIDDEN;
    }
  }
  return Promise.reject(errorMessage);
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
