import {View, FlatList, RefreshControl, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import NotificationCard from '../../components/molecules/notificationCard';
import {useDispatch, useSelector} from 'react-redux';
import {loadGetAllNotification} from '../../redux/action/notification/getAllNotification';
import {colorPalette} from '../../components/atoms/colorPalette';
import Loader from '../../components/atoms/loader';
import CustomImage from '../../components/atoms/customImage';

const NotificationScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const pageNo = 0;
  const [notification, setNotification] = useState([]);

  const [refresh, setRefresh] = useState(false);
  const res = useSelector(state => state.getAllNotificationReducer?.data);

  const loading = useSelector(
    state => state.getAllNotificationReducer?.loading?.loader,
  );

  useEffect(() => {
    if (res?.object.length !== 0 && res !== null) {
      setNotification(res?.object);
    }
  }, [res]);

  useEffect(() => {
    dispatch(loadGetAllNotification(pageNo));
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
      <SubHeader title={'Notifications'} navigation={navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {notification?.length === 0 ? (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                <CustomImage
                  resizeMode="contain"
                  styles={{width: '70%'}}
                  source={require('../../assets/images/nopatients.png')}
                />
              </View>
            </>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(index, item) => index.toString()}
              data={notification}
              renderItem={({item}) => (
                <NotificationCard
                  text={item.message}
                  date={item.localDate}
                  time={item.localTime}
                  notificationId={item.notificationId}
                  sender={item.sender}
                />
              )}
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(loadGetAllNotification(pageNo));
                    setRefresh(false);
                  }}
                />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default NotificationScreen;
