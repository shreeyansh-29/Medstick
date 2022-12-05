import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {faClock, faPills, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
import CustomImage from '../../../components/atoms/customImage';
import {week} from '../../../constants/constants';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';
import Loader from '../../../components/atoms/loader';

const MedicinePanel = ({navigation}) => {
  const [medicineResponse, setMedicineResponse] = useState([]);
  const isFocused = useIsFocused();
  const progress = useRef(new Animated.Value(0)).current;
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => {
      false;
    };
  }, []);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const deleteMedicineLocal = async index => {
    medicineResponse.splice(index, 1);
    AddMedicine(medicineResponse);
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        setMedicineResponse(data);
      } else {
        setMedicineResponse([]);
      }
    });
  };

  const MedicineHistory = data => {
    var updateArray = [];
    let history = {
      historyId: null,
      date: null,
      taken: '',
      notTaken: '',
      time: null,
    };
    for (let i = 0; i < data.length; i++) {
      if (data[i].everyday == true) {
        data[i].days = [
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thur',
          'Fri',
          'Sat',
        ].toString();
      }
      let arr = data[i].days.split(',');
      let set = new Set(arr);
      var start_date = new Date(data[i].endDate);
      var end_date = new Date(data[i].endDate);
      var tody_date = new Date();
      let td_da =
        tody_date.getFullYear() +
        '-' +
        (tody_date.getMonth() + 1) +
        '-' +
        tody_date.getDate();
      if (
        data[i].endDate !== 'No End Date' &&
        set.has(week[tody_date.getDay()]) &&
        start_date <= tody_date <= end_date
      ) {
        if (data[i].historyList.length === 0) {
          history.historyId = uuid.v4();
          history.date = td_da;
          history.time = data[i].reminderTime.split(',');
          history.notTaken = data[i].reminderTime;
          history.taken = '';
          data[i].historyList.push(history);
        } else {
          const a = b => b.date === td_da;
          const index = data[i].historyList.findIndex(a);
          history.time = data[i].reminderTime.split(',');
          if (
            index >= 0 &&
            history.time.toString() !=
              data[i].historyList[index].time.toString()
          ) {
            history.historyId = data[i].historyList[index].historyId;
            history.date = data[i].historyList[index].date;
            history.notTaken = data[i].reminderTime;
            history.taken = '';
            history.time = data[i].reminderTime.split(',');
            data[i].historyList[index] = history;
            data[i].totalReminders = 0;
            data[i].currentCount = 0;
          } else if (index < 0) {
            history.historyId = uuid.v4();
            history.date = td_da;
            history.time = data[i].reminderTime.split(',');
            history.notTaken = data[i].reminderTime;
            history.taken = '';
            data[i].historyList.push(history);
          }
        }
      } else if (data[i].endDate === 'No End Date') {
        const a = b => b.date == td_da;
        const index = data[i].historyList.findIndex(a);
        if (data[i].historyList.length === 0) {
          history.historyId = uuid.v4();
          history.date = td_da;
          history.time = data[i].reminderTime.split(',');
          history.notTaken = data[i].reminderTime;
          data[i].historyList.push(history);
        } else {
          const a = b => b.date === td_da;
          const index = data[i].historyList.findIndex(a);
          history.time = data[i].reminderTime.split(',');
          if (
            index >= 0 &&
            history.time.toString() !=
              data[i].historyList[index].time.toString()
          ) {
            history.historyId = data[i].historyList[index].historyId;
            history.date = data[i].historyList[index].date;
            history.notTaken = data[i].reminderTime;
            history.taken = '';
            history.time = data[i].reminderTime.split(',');
            data[i].historyList[index] = history;
          }
        }
      }

      updateArray.push(data[i]);
     
    }
    AddMedicine(updateArray);
  };

  useEffect(() => {
    if (isFocused) {
      getMedicine().then(data => {
        if (data !== null && data.length !== 0) {
          setMedicineResponse(data);
        }
      });
    }
  }, [isFocused]);

  const deleteRem = name => {
    PushNotification.getScheduledLocalNotifications(rn => {
      for (let i = 0; i < rn.length; i++) {
        if (name === rn[i].number) {
          PushNotification.cancelLocalNotification({id: rn[i].id});
        }
      }
    });
  };

  useEffect(() => {
    medicineResponse.map(item => {
      item.reminderId !== null ? MedicineHistory(medicineResponse) : null;
    });
  }, [medicineResponse]);

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
            <Card style={Styles.card}>
              <View style={Styles.listView}>
                <ListItem style={Styles.list}>
                  <ListItem.Content>
                    <View style={Styles.avatarView}>
                      <FontAwesomeIcon
                        icon={faPills}
                        size={36}
                        color={colorPalette.mainColor}
                      />
                      <View style={Styles.medNameView}>
                        <ListItem.Title style={Styles.medName}>
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
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Stock: </Text>
                          {item.stock}
                        </ListItem.Subtitle>
                      </View>
                    </View>
                  </ListItem.Content>
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
                            ? colorPalette.mainColor
                            : 'lightgrey'
                        }
                        size={24}
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
                        color={colorPalette.mainColor}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </ListItem>
              </View>
            </Card>
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
            <View style={Styles.lottie}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/nomeds.png')}
                styles={{width: '66%'}}
              />
            </View>
          ) : (
            <>
              <FlatList
                data={medicineResponse}
                renderItem={renderItemLocal}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};
export default MedicinePanel;
