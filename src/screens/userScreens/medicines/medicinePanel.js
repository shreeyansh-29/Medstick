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
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {RefreshControl} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

const MedicinePanel = ({navigation}) => {
  const [medicineResponse, setMedicineResponse] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const deleteMedicineLocal = async (index,name) => {
    medicineResponse.splice(medicineResponse.indexOf(index), 1);
    setTimeout(() => {
      AddMedicine(medicineResponse);
    }, 200);
    deleteRem(name);
  };

  useEffect(() => {
    if (isFocused) {
      getMedicine().then(data => {
        if (data !== null) {
          setMedicineResponse(data);
        } else {
          setMedicineResponse([]);
        }
      });
    }
  }, [isFocused]);

  const deleteRem = name => {
    PushNotification.getScheduledLocalNotifications(rn => {
      for (let i = 0; i < rn.length; i++) {
        if ('Take ' + name === rn[i].message) {
          PushNotification.cancelLocalNotification({id: rn[i].id});
        }
      }
    });
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
                          {item.medicineName}
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
                      onPress={() => {
                        Alert.alert('Delete it!', 'Sure you want delete it', [
                          {
                            text: 'Delete',
                            onPress: () => deleteMedicineLocal(index, item.medicineName),
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
        {medicineResponse.length === 0 ? (
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
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    getMedicine().then(data => {
                      setMedicineResponse(data);
                    });
                    setRefresh(false);
                  }}
                />
              }
            />
          </>
        )}
      </View>
    </>
  );
};
export default MedicinePanel;
