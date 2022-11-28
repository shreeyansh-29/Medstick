import NetInfo from '@react-native-community/netinfo';

const CheckConnection = async () => {
  let state_type = null;
  return new Promise(res => {
    const unsubscribe = NetInfo.addEventListener(state => {
      state_type = state.isConnected;
      res(state_type);
    });

    unsubscribe();
  });
};

export default CheckConnection;

