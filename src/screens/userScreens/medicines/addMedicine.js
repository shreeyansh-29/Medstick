import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddMedicinesHeader from '../../../components/molecules/headers/addMedicinesHeader';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';

import {colorPalette} from '../../../components/atoms/colorPalette';
import {faArrowLeft, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {Divider, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectMedicineName from '../../../components/atoms/selectMedicineName';
import TotalStock from '../../../components/molecules/totalStock';
import LeftStock from '../../../components/molecules/leftStock';
import ModalHeader from '../../../components/molecules/headers/modalHeader';
import SaveButton from '../../../components/molecules/saveButton';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadAddMedicine} from '../../../redux/action/userMedicine/addMedicineAction';
import {showSuccessMessage} from '../../../components/atoms/successMessage';
import Toast from 'react-native-toast-message';
import AddMedicineButton from '../../../components/atoms/addMedicineButton';
import {loadSaveUserMedicine} from '../../../redux/action/userMedicine/saveUserMedicineAction';
import {searchMedicineRequest} from '../../../redux/action/userMedicine/searchMedicineAction';
import {ListItem} from 'react-native-elements';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {openDatabase} from 'react-native-sqlite-storage';
import SubHeader from '../../../components/molecules/headers/subHeader';
import uuid from 'react-native-uuid';
import {saveUserMedicine} from '../../../redux/constant/userMedicine/saveUserMedicineConstant';

var db = openDatabase({name: 'MedicineDatabase.db'});

const AddMedicines = ({navigation, route}) => {
  const [medicineName, setMedicineName] = useState('');
  const [userMedicineName, setUserMedicineName] = useState('');
  const [userMedicineDescription, setUserMedicineDescription] = useState('');
  const [searchMedicineByName, setSearchMedicineByName] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const [details, setDeatils] = useState('');
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [pill, setPill] = useState('tablet');
  const [stock, setStock] = useState(0);
  const [remainingStock, setRemainingStock] = useState('');
  const [dosageQuantity, setDosageQuantity] = useState('');
  const [token, setToken] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [id, setId] = useState('');
  const [dose, setDose] = useState('');
  const [prescriptionId, setPrescriptionId] = useState('');
  const [doseType, setDoseType] = useState('');
  const dispatch = useDispatch();
  const [arr, setArr] = useState('');
  const [array, setArray] = useState('');
  const [flag, setFlag] = useState('');

  // useEffect(() => {
  //   getSaveMedicine().then(data => setArray(data));
  // }, []);

  // useEffect(() => {
  //   getMedicine().then(data => setArr(data));
  // }, []);

  const searchMedicine = useSelector(state => state.searchMedicine);
  // console.log(tempSearch, 'search');

  useEffect(() => {
    if (searchMedicine.data !== null) {
      setTempSearch(searchMedicine.data);
    }
  }, [searchMedicine]);

  const payload = {pill, dosageQuantity, doseType, stock, remainingStock};
  // console.log(payload, 'all');
  const getTokenId = async () => {
    try {
      const tokentemp = await AsyncStorage.getItem('accessToken');
      if (tokentemp !== null) {
        setToken(tokentemp);
      }
    } catch (error) {
      // console.log(error, 'error');
    }
    const tempId = await AsyncStorage.getItem('user_id');
    setId(tempId);
  };

  const progress = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   dispatch(searchMedicineRequest(searchMedicineByName));
  // }, [searchMedicineByName]);

  const search = data => {
    setSearchMedicineByName(data);
    dispatch(searchMedicineRequest(data));
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    getTokenId();
  }, []);

  const showSuccessMessage = () => {
    Alert.alert(
      'Success',
      'Medicine Added Successfully',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );

    navigation.pop();
  };
  const showPrescriptionAlert = () => {
    Alert.alert(
      'Warning',
      'No prescription added',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const showMedicineAlert = () => {
    Alert.alert('Warning', 'select the medicine', [{text: 'OK'}], {
      cancelable: false,
    });
  };

  const showAlert = () => {
    Alert.alert(
      'Warning',
      'Fill all the boxs',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const setType = () => {
    switch (pill) {
      case 'tablet': {
        setDoseType('mg');
        break;
      }
      case 'inhaler': {
        setDoseType('count');
        break;
      }
      case 'injection': {
        setDoseType('ml');
        break;
      }
      case 'syrup': {
        setDoseType('ml');
        break;
      }
      default: {
        setDoseType('mg');
      }
    }
  };
  useEffect(() => {
    setType();
  }, [pill]);

  const fetchPrescriptionAndMedicineId = async () => {
    const tempPrescriptionId = await AsyncStorage.getItem('prescription_id');
    const tempMedicineId = await AsyncStorage.getItem('medicine_id');
    setMedicineId(tempMedicineId);
    setPrescriptionId(tempPrescriptionId);
  };

  useEffect(() => {
    fetchPrescriptionAndMedicineId();
  }, []);

  const getStock = data => {
    setStock(data);
  };

  const getRemainingStock = data => {
    setRemainingStock(data);
  };

  const setdata = item => {
    setSearchModal(false);
    setMedicineName(item.medicineName);
    setDeatils(item.description);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <ListItem style={styles.list}>
          <ListItem.Content>
            <View style={{padding: 2}}>
              <TouchableOpacity onPress={() => setdata(item)}>
                <View style={{flexDirection: 'row'}}>
                  <ListItem.Subtitle>
                    <Text
                      style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
                      {'Medicine Name: '}
                    </Text>
                    {`${item.medicineName}`}
                    {','}
                  </ListItem.Subtitle>
                </View>

                <ListItem.Subtitle>
                  <Text
                    style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
                    {'Description: '}
                  </Text>
                  {`${item.description}`}
                </ListItem.Subtitle>
              </TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
        <Divider />
      </View>
    );
  };

  const addMedicineInLocalStorage = async () => {
    if (
      pill === '' ||
      stock === '' ||
      remainingStock === '' ||
      dosageQuantity === '' ||
      doseType === ''
    ) {
      showAlert();
    } else {
      let userMedicineId = uuid.v4();
      let medicineId = uuid.v4();

      let obj = {
        userMedicineId: userMedicineId,
        medicineId: medicineId,
        medicineName: medicineName,
        medicineDescription: details,
        prescriptionId: null,
        doctorName: null,
        prescriptionUrl: null,
        location: null,
        specialization: null,
        contact: null,
        present: 'true',
        dosageType: pill,
        dosageQuantity: dosageQuantity,
        dosagePower: dose + doseType,
        leftStock: remainingStock,
        stock: 20,
        reminderId: null,
        startDate: null,
        endDate: null,
        days: null,
        reminderTitle: null,
        reminderTime: null,
        everyday: null,
        noEndDate: null,
        reminderStatus: null,
        frequency: null,
        beforeAfter: null,
        totalReminders: null,
        currentCount: null,
        historyList: [],
      };

      getMedicine().then(data => {
        if (data !== null) {
          console.log(data, ' data');
          const temp = [...data, obj];
          AddMedicine(temp);
        } else {
          let temp = [];
          temp.push(obj);
          AddMedicine(temp);
          console.log(data, ' temp');
        }
      });
      setTimeout(() => {
        navigation.pop();
      }, 1000);
    }
  };

  return (
    <View style={Styles.addMedicinePage}>
      <Toast visibilityTime={3000} />
      <Modal
        animationType="slide"
        visible={modal}
        onRequestClose={() => setModal(false)}
        transparent={true}>
        <View style={{flex: 1, backgroundColor: colorPalette.mainColor}}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Ionicons name="close" size={30} color={'white'} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: 20,
            }}>
            <LottieView
              style={{width: '60%'}}
              autoPlay
              loop
              speed={0.6}
              source={require('../../../assets/animation/modal.json')}
            />
          </View>
          <View style={Styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '85%'}}>
                  <TextInput
                    id="name"
                    label="Medicine Name"
                    value={medicineName}
                    mode="outlined"
                    onChangeText={text => setMedicineName(text)}
                    outlineColor="#02aba6"
                    activeOutlineColor="#02aba6"
                  />
                </View>
                {id !== null && (
                  <View
                    style={{
                      alignSelf: 'center',
                      marginLeft: 12,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSearchModal(true);
                        setDeatils('');
                      }}>
                      <FontAwesomeIcon
                        size={25}
                        icon={faSearch}
                        color={colorPalette.mainColor}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <TextInput
                id="name"
                label="Description"
                value={details}
                mode="outlined"
                multiline={true}
                numberOfLines={6}
                onChangeText={text => setDeatils(text)}
                outlineColor="#02aba6"
                activeOutlineColor="#02aba6"
              />
              <TouchableOpacity
                style={{marginVertical: 40}}
                onPress={() => setModal(false)}>
                <SaveButton />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal
        visible={searchModal}
        animationType="fade"
        onRequestClose={() => {
          setSearchModal(false);
        }}>
        <View style={{margin: '5%'}}>
          <TouchableOpacity
            style={Styles.backButton}
            onPress={() => {
              setSearchModal(false);
            }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={22}
              color={colorPalette.mainColor}
            />
          </TouchableOpacity>
          <View style={{marginTop: '4%'}}>
            <TextInput
              label="Search Medicine"
              mode="outlined"
              multiline={true}
              onChangeText={text => search(text)}
              outlineColor={colorPalette.mainColor}
              activeOutlineColor={colorPalette.mainColor}
            />
          </View>
          {tempSearch?.result?.content?.length === 0 ? (
            <></>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={tempSearch?.result?.content}
              renderItem={renderItem}
              numColumns={1}
            />
          )}
        </View>
      </Modal>

      {/* <View style={Styles.addMedicinesHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation?.pop();
          }}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={30}
            color={colorPalette.basicColor}
          />
        </TouchableOpacity>
        <AddMedicinesHeader navigation={navigation} />
      </View> */}
      <SubHeader navigation={navigation} title={'Add Medicine'} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          style={{width: '48%'}}
          progress={progress}
          speed={0.6}
          source={require('../../../assets/animation/addMedicinesHeader.json')}
        />
      </View>
      <View style={Styles.constainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView>
            {/* {id !== null ? ( */}
            <TouchableOpacity onPress={() => setModal(true)}>
              <SelectMedicineName medicineName={medicineName} />
            </TouchableOpacity>
            {/* ) : (
              <View>
                <TextInput
                  style={{width: '100%'}}
                  id="name"
                  label="Medicine Name"
                  value={userMedicineName}
                  mode="outlined"
                  onChangeText={text => setUserMedicineName(text)}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                />
                <TextInput
                  style={{width: '100%'}}
                  id="name"
                  label="Medicine description"
                  value={userMedicineDescription}
                  mode="outlined"
                  onChangeText={text => setUserMedicineDescription(text)}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                  multiline={true}
                  numberOfLines={6}
                />
              </View>
            )} */}
            <View style={Styles.textView1}>
              <View style={{width: '48%'}}>
                <View style={Styles.picker}>
                  <Picker
                    style={{
                      color: 'black',
                    }}
                    id="picker1"
                    placeholder="Select Medicine Type"
                    selectedValue={pill}
                    onValueChange={value => setPill(value)}>
                    <Picker.Item label="Tablet" value="tablet" />
                    <Picker.Item label="Inhaler" value="inhaler" />
                    <Picker.Item label="Injection" value="injection" />
                    <Picker.Item label="Syrup" value="syrup" />
                  </Picker>
                </View>
              </View>
              <View style={{width: '50%'}}>
                <TextInput
                  style={{width: '97%'}}
                  id="name"
                  label="Dosage Quantity"
                  value={dosageQuantity}
                  mode="outlined"
                  onChangeText={text => setDosageQuantity(text)}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                />
              </View>
            </View>
            <View style={Styles.textView}>
              <View style={{width: '50%'}}>
                <TextInput
                  style={{width: '97%'}}
                  id="name"
                  label="Dosage Power"
                  value={dose}
                  mode="outlined"
                  onChangeText={text => setDose(text)}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                  keyboardType="numeric"
                  placeholderTextColor={'grey'}
                />
              </View>
              <View style={{width: '50%'}}>
                <TextInput
                  id="name"
                  style={{width: '97%'}}
                  label="Dose Type"
                  value={doseType}
                  mode="outlined"
                  onChangeText={setDoseType}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={Styles.textView}>
              <View style={Styles.textbox}>
                <Text style={Styles.text}>Stock Unit</Text>
              </View>
              <View>
                <TotalStock onChange={getStock} />
              </View>
            </View>
            <View style={Styles.textView}>
              <View style={Styles.textbox}>
                <Text style={Styles.text}>Notify me when only </Text>
              </View>
              <View>
                <LeftStock onChange={getRemainingStock} />
              </View>
            </View>

            <View style={Styles.textView}>
              <View style={Styles.textbox}>
                <Text style={Styles.text}>Add Prescription Here </Text>
                <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
                  (Optional)
                </Text>
              </View>

              <TouchableOpacity
                style={Styles.touchableOpacity}
                onPress={() => {
                  navigation.navigate('addPrescriptionPanel');
                }}>
                <LottieView
                  style={Styles.addPrescriptionIcon}
                  speed={0.7}
                  progress={progress}
                  source={require('../../../assets/animation/addPrescriptionButton.json')}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={Styles.touchableOpacity}
              onPress={() =>
                addMedicineInLocalStorage(
                  id,
                  token,
                  prescriptionId,
                  medicineId,
                  pill,
                  // dose,
                  doseType,
                  stock,
                  remainingStock,
                )
              }>
              <SaveButton />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default AddMedicines;
