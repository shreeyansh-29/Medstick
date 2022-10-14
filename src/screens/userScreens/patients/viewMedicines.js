import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {loadMedicineList} from '../../../redux/action/userMedicine/medicineListAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {faBell, faPills} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {notifyUserRequest} from '../../../redux/action/patients/notifyUserAction';
import Toast from 'react-native-toast-message';

const ViewMedicines = ({navigation, route}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.medicineList);
  // console.log(res);
  const res1 = useSelector(state => state.notifyUser);
  // console.log(res1);
  const loading = useSelector(state => state.medicineList?.isLoading);
  const [medicines, setMedicines] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let resp = route?.params?.item;

  useEffect(() => {
    if (res1?.data?.status === 'Success') {
      console.log('hello');
      Toast.show({
        type: 'success',
        text1: 'Notification Send Successfully',
        position: 'bottom',
      });
    }
  }, [res1]);

  useEffect(() => {
    if (res?.data !== null) {
      setMedicines(res?.data);
    }
  }, [res]);

  useEffect(() => {
    dispatch(loadMedicineList(resp?.userId));
  }, []);

  const sendNotificationToUser = (fcmToken, medName, patientId) => {
    dispatch(notifyUserRequest({medName, fcmToken, patientId}));
  };

  const renderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomInUp" duration={400} delay={index * 400}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            margin: 2,
          }}
          onPress={() => {
            navigation.navigate('MedicineReport', {
              item: item,
            });
          }}>
          <ListItem
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}>
            <FontAwesomeIcon
              icon={faPills}
              size={36}
              color={colorPalette.mainColor}
            />
            <ListItem.Content style={{}}>
              <ListItem.Title
                style={{
                  fontWeight: '800',
                }}>{`${item.medicineName}`}</ListItem.Title>
              <ListItem.Subtitle
                style={{marginVertical: 3, fontSize: 16, fontWeight: '400'}}>
                {item.days}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={{fontSize: 14, fontWeight: '400'}}>
                {item.reminderTime}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 4,
              }}>
              <TouchableOpacity
                style={{
                  marginRight: 12,
                  borderRadius: 4,
                  backgroundColor: colorPalette.mainColor,
                }}
                onPress={() =>
                  navigation.navigate('MedicineImages', {
                    item: item?.userMedicineId,
                  })
                }>
                <Text style={{padding: 8, fontSize: 16, color: 'white'}}>
                  Images
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  sendNotificationToUser(
                    resp?.fcmToken,
                    item?.medicineName,
                    resp?.userId,
                  );
                }}>
                <FontAwesomeIcon
                  icon={faBell}
                  color={colorPalette.mainColor}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </ListItem>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colorPalette.basicColor}}>
      <SubHeader navigation={navigation} />
      <Toast visibilityTime={3000} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {medicines.length === 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: colorPalette.backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/nopatients.png')}
                styles={{width: '70%'}}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                // alignItems: 'center',
                backgroundColor: colorPalette.backgroundColor,
                paddingTop: 2,
              }}>
              <FlatList
                data={medicines}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    onRefresh={() => {
                      setRefresh(false);
                      dispatch(loadMedicineList(resp?.userId));
                    }}
                  />
                }
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default ViewMedicines;
