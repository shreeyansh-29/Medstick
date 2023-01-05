import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as apiUrl from '../constants/apiUrl';

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

const refreshToken = async () => {
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
      destroyToken()
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
  return response;
};

const errorHandler = error => {
  const status = error.response ? error.response.status : null;
  if (status === 401) {
    refreshToken();
  }
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
