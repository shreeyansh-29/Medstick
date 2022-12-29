import React, {useEffect} from 'react';
import {View} from 'react-native';
import CustomImage from '../../components/atoms/customImage';
import styles from '../../styles/otherScreensStyles/onBoardingStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {refreshRequest} from '../../redux/action/signUpAction/refreshAction';
import {expiryRequest} from '../../redux/action/signUpAction/expiryActions';

const SplashScreen = () => {
  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);
  const expiry = useSelector(state => state.expiry?.error);
  const Refresh = useSelector(state => state.refresh?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (connected && load) {
      dispatch(expiryRequest());
    }
  }, [connected, load]);

  useEffect(() => {
    if (Refresh !== null) {
      (async () => {
        await AsyncStorage.removeItem('refreshToken');
        await AsyncStorage.removeItem('accessToken');

        await AsyncStorage.setItem('refreshToken', Refresh.refreshToken);
        await AsyncStorage.setItem('accessToken', Refresh.accessToken);
      })();
    }
  }, [Refresh]);

  useEffect(() => {
    if (expiry?.status === 403 && expiry?.status !== undefined) {
      dispatch(refreshRequest());
    }
  }, [expiry]);

  return (
    <View style={styles.container}>
      <CustomImage
        source={require('../../assets/images/medstick.png')}
        styles={styles.img}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
