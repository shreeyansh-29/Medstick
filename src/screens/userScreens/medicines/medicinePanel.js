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
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {faClock, faPills, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {useDispatch, useSelector} from 'react-redux';
import {loadMedicineList} from '../../../redux/action/userMedicine/medicineListAction';
import {useIsFocused} from '@react-navigation/native';
import {deleteMedicineRequest} from '../../../redux/action/userMedicine/deleteMedicine';
import Loader from '../../../components/atoms/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveReminderSelector} from '../../../constants/Selector/saveReminderSelector';
import {AddMedicine, getMedicine} from '../../../utils/storage';

const MedicinePanel = ({navigation}) => {
  const [flag, setFlag] = useState('');
  const [medicineResponse, setMedicineResponse] = useState();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [id, setId] = useState('');
  console.log('id', id);
  const [medicines, setMedicines] = useState([]);
  const res = useSelector(state => state.medicineList);
  const loading = useSelector(state => state.medicineList?.isLoading);
  const res1 = useSelector(state => state.deleteMedicine);
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState(false);
  const [clockActive, setClockActive] = useState(false);
  console.log(color, 'color');
  console.log(clockActive, 'colorActive');
  // const saveReminderData = useSelector(saveReminderSelector.saveReminder);
  // console.log(saveReminderData.data.data,"dataaaaaa");

  const onClickTouchable = saveReminder => {
    if (saveReminderData.data.data.status === 'Success') {
      setIsActive(true);
    }
  };

  const clockColorChange = item => {
    if (item.userMedicineId && color) {
      setClockActive(true);
    }
  };

  const getStatus = () => {
    setColor(true);
  };

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (res?.data !== null) {
      console.log(res);
      setMedicines(res?.data);
    } else {
      setMedicines([]);
    }
  }, [res]);

  const userMeds = async () => {
    dispatch(loadMedicineList(await AsyncStorage.getItem('user_id')));
  };

  useEffect(() => {
    if (isFocused) {
      userMeds();
    }
  }, [isFocused]);

  const deleteMedicineLocal = async index => {
    medicineResponse.splice(medicineResponse.indexOf(index), 1);
    AddMedicine(medicineResponse);
    navigation.navigate('MedicinePanel');
  };

  const deleteMedicine = userMedicineId => {
    dispatch(deleteMedicineRequest(userMedicineId));
    setTimeout(async () => {
      dispatch(loadMedicineList(await AsyncStorage.getItem('user_id')));
    }, 300);
  };

  useEffect(() => {
    let res = getMedicine();
    res.then(data => {
      setMedicineResponse(data);
    }),
      getTokenId();
    setFlag(1);
  }, []);

  const getTokenId = async () => {
    const tempId = await AsyncStorage.getItem('user_id');
    setId(tempId);
  };

  const renderItemLocal = ({item, index}) => {
    return (
      <>
        <Animatable.View animation="zoomInUp" duration={400}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('MedicineList', {
                data: medicines,
                index: index,
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
                          {item.MedicineName}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Type: </Text>
                          {item.dosageType}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Dosage: </Text>
                          {item.dosageUnit + item.dosageQuantity}
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
                      style={Styles.rem}
                      onPress={() => {
                        navigation.navigate('Reminder', {
                          id: item.userMedicineId,
                        });
                      }}>
                      <FontAwesomeIcon
                        icon={faClock}
                        color={colorPalette.mainColor}
                        size={24}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('Delete it!', 'Sure you want delete it', [
                          {
                            text: 'Delete',
                            onPress: () => deleteMedicineLocal(index),
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

  const renderItem = ({item, index}) => {
    return (
      <>
        <Animatable.View animation="zoomInUp" duration={400}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('MedicineList', {
                data: medicines,
                index: index,
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
                          <Text style={{color: 'black'}}>
                            Dosage Quantity:{' '}
                          </Text>
                          {item.dosageQuantity}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Dosage Unit: </Text>
                          {item.dosageUnit}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Total Stock: </Text>
                          {item.stock}
                        </ListItem.Subtitle>
                      </View>
                    </View>
                  </ListItem.Content>
                  <View style={Styles.icon}>
                    <TouchableOpacity
                      activeOpacity={1}
                      id="touch1"
                      style={Styles.rem}
                      onPress={() => {
                        navigation.navigate('Reminder', {
                          id: item.userMedicineId,
                          fetchStatus: getStatus(),
                        });
                        clockColorChange(item);
                      }}>
                      <FontAwesomeIcon
                        icon={faClock}
                        color={
                          clockActive && item.userMedicineId
                            ? colorPalette.mainColor
                            : 'grey'
                        }
                        size={24}
                      />

                      {console.log(color, 'colorrrrrrrrrr')}
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        Alert.alert('Delete it!', 'Sure you want delete it', [
                          {
                            text: 'Delete',
                            onPress: () => deleteMedicine(item.userMedicineId),
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
    <>
      {id !== null && (
        <View style={Styles.container}>
          <View style={Styles.background} />
          <MainHeader title={'Medicine'} navigation={navigation} />
          {loading ? (
            <Loader />
          ) : (
            <>
              {medicines?.length === 0 ? (
                <View style={Styles.lottie}>
                  <LottieView
                    style={{width: '60%'}}
                    speed={0.8}
                    source={require('../../../assets/animation/noMed1.json')}
                    progress={progress}
                  />
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <FlatList
                    data={medicines}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              )}
            </>
          )}
        </View>
      )}
      {id === null && medicineResponse !== null && (
        <View style={Styles.container}>
          <View style={Styles.background} />
          <MainHeader title={'Medicine'} />
          {medicineResponse?.length === 0 ? (
            <View style={Styles.lottie}>
              <LottieView
                style={{width: '60%'}}
                speed={0.8}
                source={require('../../../assets/animation/noMed1.json')}
                progress={progress}
              />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                data={medicineResponse}
                renderItem={renderItemLocal}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      )}
      {id === null && flag === 1 && (
        <View style={Styles.container}>
          <MainHeader title={'Medicine'} />
          <View style={Styles.lottie}>
            <LottieView
              style={{width: '60%'}}
              speed={0.8}
              source={require('../../../assets/animation/noMed1.json')}
              progress={progress}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default MedicinePanel;
