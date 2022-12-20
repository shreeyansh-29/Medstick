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
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
import CustomImage from '../../../components/atoms/customImage';
import PushNotification from 'react-native-push-notification';
import Loader from '../../../components/atoms/loader';
import {colorPallete} from '../../../components/atoms/colorPalette';

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

  useEffect(() => {
    if (isFocused) {
      getMedicine().then(data => {
        // console.log(data);
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
                        color={colorPallete.mainColor}
                      />
                      <View style={Styles.medNameView}>
                        <ListItem.Title
                          style={Styles.medName}
                          numberOfLines={1}>
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
