import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from '../../styles/otherScreensStyles/onBoardingStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {expiryRequest} from '../../redux/action/signUpAction/expiryActions';
import {refreshRequest} from '../../redux/action/signUpAction/refreshAction';
import {getMedicine} from '../../utils/storage';
import CustomImage from '../../components/atoms/customImage';
import Notifications from '../../pushNotification/pushNotifications';

const SplashScreen = () => {
  const dispatch = useDispatch();
  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);
  const [isLoading, setIsLoading] = useState(true);
  const expiry = useSelector(state => state.expiry?.error);
  const [medData, setMedData] = useState([]);
  const Refresh = useSelector(state => state.refresh?.data);

  // useEffect(() => {
  //   connected && load ? dispatch(expiryRequest()) : null;
  // }, [connected, load]);

  // useEffect(() => {
  //   if (Refresh !== null) {
  //     (async () => {
  //       await AsyncStorage.removeItem('refreshToken');
  //       await AsyncStorage.removeItem('accessToken');

  //       await AsyncStorage.setItem('refreshToken', Refresh.refreshToken);
  //       await AsyncStorage.setItem('accessToken', Refresh.accessToken);
  //     })();
  //   }
  // }, [Refresh]);

  const getData = async () => {
    getMedicine().then(data => {
      if (data.length !== 0 && data !== null) {
        setMedData(data);
      } else {
        setMedData([]);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    notifyNotification();
  }, [medData]);

  const notifyNotification = () => {
    let date = new Date();
    let i;
    for (i = 0; i < medData.length; i++) {
      if (parseInt(medData[i].leftStock) >= parseInt(medData[i].stock)) {
        Notifications.notifyMedicineNotification(
          date,
          medData[i]?.stock,
          medData[i]?.medicineName,
        );
      }
    }
  };

  // useEffect(() => {
  //   if (expiry?.status === 403 && expiry?.status !== undefined) {
  //     dispatch(refreshRequest());
  //   }
  // }, [expiry]);

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
