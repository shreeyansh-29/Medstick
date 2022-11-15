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
import {AddMedicine, getMedicine} from '../../../utils/storage';

const MedicinePanel = ({navigation}) => {
  const [flag, setFlag] = useState('');
  console.log(flag, 'flag');
  const [medicineResponse, setMedicineResponse] = useState();
  console.log(medicineResponse, 'medicineresponse');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [id, setId] = useState('');
  console.log('id', id);
  const [medicines, setMedicines] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState(false);
  const [clockActive, setClockActive] = useState(false);

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

  const deleteMedicineLocal = async index => {
    medicineResponse.splice(medicineResponse.indexOf(index), 1);
    AddMedicine(medicineResponse);
    navigation.navigate('Medicine');
  };

  useEffect(() => {
    getMedicine().then(data => {
      setMedicineResponse(data);
    });
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

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.background} />
        <MainHeader title={'Medicine'} navigation={navigation} />
        {medicineResponse === null ? (
          <View style={Styles.lottie}>
            <LottieView
              style={{width: '60%'}}
              speed={0.8}
              source={require('../../../assets/animation/noMed1.json')}
              progress={progress}
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
      </View>
    </>
  );
};
export default MedicinePanel;
