import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {faClock, faPills, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import CustomImage from '../../../components/atoms/customImage';
import PushNotification from 'react-native-push-notification';
import Loader from '../../../components/atoms/loader';
import {colorPallete} from '../../../components/atoms/colorPalette';
import syncMedicine from '../../../sync/syncMedicine';
import {useDispatch, useSelector} from 'react-redux';

const MedicinePanel = ({navigation}) => {
  const dispatch = useDispatch();
  const [medicineResponse, setMedicineResponse] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const connected = useSelector(state => state.internetConnectivity?.data);
  const load = useSelector(state => state.userInfo?.data);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1500);
    return () => {
      false;
    };
  }, [showLoader]);

  useFocusEffect(
    React.useCallback(() => {
      syncMedicine(dispatch).then(() => fetchData());
      return () => false;
    }, [connected, load]),
  );

  const fetchData = () => {
    let arr = [];
    setRefresh(false);
    getMedicine()
      .then(data => {
        // console.log('previous Data', data);
        if (data !== null && data.length !== 0) {
          data.map(ele => {
            if (ele.flag === false) arr.push(ele);
          });
          // console.log('new Arr', arr);
          setMedicineResponse(arr);
        }
      })
      .then(() => {
        if (connected && load) {
          // console.log('newly pushing array', arr);
          AddMedicine(arr);
        }
      });
  };

  const deleteMedicineLocal = async index => {
    medicineResponse[index].flag = true;
    medicineResponse[index].isSynced = false;
    AddMedicine(medicineResponse);

    if (connected && load) syncMedicine(dispatch);

    setShowLoader(true);
    setMedicineResponse([]);
    fetchData();
  };

  const deleteRem = name => {
    PushNotification.getScheduledLocalNotifications(rn => {
      for (let i = 0; i < rn.length; i++) {
        if (name === rn[i].number) {
          PushNotification.cancelLocalNotification({id: rn[i].id});
        }
      }
    });
  };

  const renderItemLocal = ({item, index}) => {
    return (
      <>
        <Animatable.View animation="zoomIn" duration={400} delay={200 * index}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('MedicinePanelStack', {
                screen: 'MedicineList',
                params: {
                  data: medicineResponse,
                  index: index,
                },
              });
            }}>
            <View style={Styles.card}>
              <View style={Styles.list}>
                <View style={Styles.avatarView}>
                  <FontAwesomeIcon
                    icon={faPills}
                    size={36}
                    color={colorPallete.mainColor}
                  />
                </View>
                <View style={Styles.medNameView}>
                  <View style={{flexDirection: 'column', width: '100%'}}>
                    <ListItem.Title style={Styles.medName} numberOfLines={1}>
                      {item.medicineName}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      <Text style={{color: 'black'}}>Type: </Text>
                      {item.dosageType}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      <Text style={{color: 'black'}}>Dosage Power: </Text>
                      {item.dosagePower}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle
                      style={{
                        color:
                          Number(item.stock) <= Number(item.leftStock)
                            ? 'red'
                            : 'grey',
                      }}>
                      <Text style={{color: 'black'}}>Stock: </Text>
                      {item.stock}
                    </ListItem.Subtitle>
                  </View>
                </View>
                <View style={Styles.icon}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={Styles.rem}
                    onPress={() => {
                      navigation.navigate('MedicinePanelStack', {
                        screen: 'Reminder',
                        params: {
                          data: item,
                          index: index,
                        },
                      });
                    }}>
                    <FontAwesomeIcon
                      icon={faClock}
                      color={
                        item.reminderStatus
                          ? colorPallete.mainColor
                          : 'lightgrey'
                      }
                      size={21}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={Styles.rem}
                    activeOpacity={1}
                    onPress={() => {
                      Alert.alert('Delete it!', 'Sure you want delete it', [
                        {
                          text: 'Delete',
                          onPress: () => {
                            deleteMedicineLocal(index);
                            deleteRem(item.medicineName);
                          },
                        },
                        {
                          text: 'Cancel',
                        },
                      ]);
                    }}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={colorPallete.mainColor}
                      size={21}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </>
    );
  };

  return (
    <View style={Styles.container}>
      <MainHeader title={'Medicine'} navigation={navigation} />
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {medicineResponse.length === 0 ? (
            <View style={Styles.imageCont}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/nomeds.png')}
                styles={Styles.img}
              />
            </View>
          ) : (
            <>
              <FlatList
                style={{paddingTop: 3}}
                data={medicineResponse}
                renderItem={renderItemLocal}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.userMedicineId}
                refreshControl={
                  <RefreshControl
                    refreshing={refresh}
                    colors={[colorPallete.mainColor]}
                    onRefresh={() => {
                      setRefresh(true);
                      setShowLoader(true);
                      setMedicineResponse([]);
                      fetchData();
                    }}
                  />
                }
              />
            </>
          )}
        </>
      )}
    </View>
  );
};
export default MedicinePanel;
