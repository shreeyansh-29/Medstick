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
import {useIsFocused} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CustomImage from '../../../components/atoms/customImage';

const MedicinePanel = ({navigation}) => {
  const [medicineResponse, setMedicineResponse] = useState([]);
  const isFocused = useIsFocused();
  const [name, setName] = useState('');

  const progress = useRef(new Animated.Value(0)).current;
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
        if (data !== null && data.length !== 0) {
          setMedicineResponse(data);
        } else {
          setMedicineResponse([]);
        }
      });
    }
  }, [isFocused]);

  const getUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    setName(user);
  };

  useEffect(() => {
    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  const renderItemLocal = ({item, index}) => {
    return (
      <>
        <Animatable.View animation="zoomInUp" duration={400}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (name !== null) {
                navigation.navigate('MedicinePanelStack', {
                  screen: 'MedicineList',
                  params: {
                    data: medicineResponse,
                    index: index,
                  },
                });
              }
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
        {/* <View style={Styles.background} /> */}
        <MainHeader title={'Medicine'} navigation={navigation} />
        {medicineResponse.length === 0 ? (
          <View style={Styles.lottie}>
            <CustomImage
              resizeMode="contain"
              source={require('../../../assets/images/nomeds.png')}
              styles={{width: '70%'}}
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
