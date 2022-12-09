import {View, FlatList, RefreshControl, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import NotificationCard from '../../components/molecules/notificationCard';
import {useDispatch, useSelector} from 'react-redux';
import {loadGetAllNotification} from '../../redux/action/notification/getAllNotification';
import {colorPallete} from '../../components/atoms/colorPalette';
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
    <View style={styles.container}>
      <SubHeader title={'Notifications'} navigation={navigation} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {notification?.length === 0 ? (
            <>
              <View style={styles.imgContainer}>
                <CustomImage
                  resizeMode="contain"
                  styles={styles.img}
                  source={require('../../assets/images/noNotification.png')}
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
                  colors={[colorPallete.mainColor]}
                  tintColor={[colorPallete.mainColor]}
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

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colorPallete.backgroundColor},
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {width: '70%'},
});

export default NotificationScreen;
