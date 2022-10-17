import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
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
import Ripple from 'react-native-material-ripple';
import {style} from '../../../styles/patientStyles/viewMedicineStyles';

const ViewMedicines = ({navigation, route}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.medicineList);
  const res1 = useSelector(state => state.notifyUser?.data);
  const loading = useSelector(state => state.medicineList?.isLoading);
  const [medicines, setMedicines] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let resp = route?.params?.item;

  useEffect(() => {
    if (res1?.status === 'Success') {
      ToastAndroid.show('Send successfully', ToastAndroid.LONG);
    } else if (res1?.status === 'Failed') {
      ToastAndroid.show('Error', ToastAndroid.LONG);
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
      <Animatable.View animation="zoomIn" duration={400} delay={index * 300}>
        <TouchableOpacity
          activeOpacity={1}
          style={style.card}
          onPress={() => {
            navigation.navigate('MedicineReport', {
              item: item,
            });
          }}>
          <ListItem
            style={style.listView}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}>
            <FontAwesomeIcon
              icon={faPills}
              size={36}
              color={colorPalette.mainColor}
            />
            <ListItem.Content style={{}}>
              <ListItem.Title
                style={style.title}>{`${item.medicineName}`}</ListItem.Title>
              <ListItem.Subtitle style={style.subtitle1}>
                {item?.days}
              </ListItem.Subtitle>
              <ListItem.Subtitle style={style.subtitle2}>
                {item?.reminderTime}
              </ListItem.Subtitle>
            </ListItem.Content>
            <View style={style.options}>
              <TouchableOpacity
                style={style.imagesbtn}
                onPress={() =>
                  navigation.navigate('MedicineImages', {
                    item: item?.userMedicineId,
                  })
                }>
                <Text style={style.imagesText}>Images</Text>
              </TouchableOpacity>
              <Ripple
                onPress={() => {
                  sendNotificationToUser(
                    resp?.fcmToken,
                    item?.medicineName,
                    resp?.userId,
                  );
                }}
                style={style.ripple}
                rippleCentered={true}
                rippleColor={'#413F42'}
                rippleDuration={700}
                rippleOpacity={0.87}
                rippleContainerBorderRadius={100}>
                <FontAwesomeIcon
                  icon={faBell}
                  color={colorPalette.mainColor}
                  size={24}
                />
              </Ripple>
            </View>
          </ListItem>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={style.mainCont}>
      <SubHeader navigation={navigation} title={'Patient Medicine'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {medicines.length === 0 ? (
            <View style={style.imgCont}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/nopatients.png')}
                styles={{width: '70%'}}
              />
            </View>
          ) : (
            <View style={style.flatList}>
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
