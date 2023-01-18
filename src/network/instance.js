import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {HTTP_STATUS_CODES, serverErrors} from '../constants/statusCodes';
// import {decryptData} from '../components/atoms/crypto';
import * as apiUrl from '../constants/apiUrl';
import { hideMessage } from 'react-native-flash-message';

const instance = axios.create({
  timeout: 10000,
});

async function saveToken(accessToken, refreshToken) {
  await AsyncStorage.setItem('accessToken', accessToken);
  await AsyncStorage.setItem('refreshToken', refreshToken);
}

async function destroyToken() {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
}

const Refresh = status => {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (status === 401) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
};

const refreshToken = async status => {
  const id = await AsyncStorage.getItem('user_id');
  const refresh = await AsyncStorage.getItem('refreshToken');

  axios
    .post(
      `${apiUrl.REFRESH_TOKEN}?userId=${id}`,
      {},
      {
        headers: {
          Authorization: refresh,
        },
      },
    )
    .then(response => {
      destroyToken();
      saveToken(response.data.accessToken, response.data.refreshToken);
    });
};

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
  const status = error.response ? error.response.status : null;
  Refresh(status).then(refreshToken).catch(function(){
    
  })
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
