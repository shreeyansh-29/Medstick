import Toast from 'react-native-toast-message';

export default {
  success(msg, position) {
    Toast.show({text1: msg, position: position, type: 'success'});
  },
  info(msg, position) {
    Toast.show({
      type: 'info',
      text1: msg,
      position: position,
    });
  },
  error(msg, position) {
    Toast.show({
      type: 'error',
      text1: msg,
      position: position,
    });
  },
};
