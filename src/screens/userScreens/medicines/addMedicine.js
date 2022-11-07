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

var db = openDatabase({name: 'MedicineDatabase.db'});

const AddMedicines = ({navigation, route}) => {
  const {
    itemDescription,
    itemDosageType,
    itemDosageUnit,
    Stock,
    doctorName,
    contact,
    specialization,
    loaction,
  } = route.params;

  const [medicineName, setMedicineName] = useState('');
  const [userMedicineName, setUserMedicineName] = useState('');
  const [userMedicineDescription, setUserMedicineDescription] = useState('');
  const [searchMedicineByName, setSearchMedicineByName] = useState('');
  const [tempSearch, setTempSearch] = useState('');
  const [details, setDeatils] = useState('');
  const [modal, setModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [dosageQuantity, setDosageQuantity] = useState('');
  const [pill, setPill] = useState('tablet');
  const [stock, setStock] = useState({Stock});
  const [remainingStock, setRemainingStock] = useState('');
  const [token, setToken] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [id, setId] = useState('');
  const [prescriptionId, setPrescriptionId] = useState('');
  const [doseType, setDoseType] = useState('');
  const saveMedicineData = useSelector(state => state.addMedicineReducer?.data);
  const saveMedicine = useSelector(state => state.addMedicineReducer);
  const dispatch = useDispatch();

  const [arr, setArr] = useState('');

  useEffect(() => {
    getMedicine().then(data => setArr(data));
  }, []);

  console.log('array', arr);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND  name='table_medicine'",
        [],
        function (tx, res) {
          console.log('item', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_medicine', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_medicine(medicine_idINTEGER PRIMARY KEY AUTOINCREMENT,medicine_name VARCHAR(20),dosage_Type VARCHAR(20),dosage_Quantity VARCHAR(20),dosage_Unit INT(1000),stock INT(100),left_Stock INT(100))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const saveUserMedicineData = useSelector(
    state => state.saveUserMedicineReducer,
  );
  console.log(saveUserMedicineData, 'RESPONSE');
  const searchMedicine = useSelector(state => state.searchMedicine);
  console.log(tempSearch, 'search');

  useEffect(() => {
    if (searchMedicine.data !== null) {
      setTempSearch([searchMedicine.data]);
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
    Alert.alert('Warning', 'select the medicine name', [{text: 'OK'}], {
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

  const saveMedicineModal = async () => {
    if (medicineName === '' || details === '') {
      showAlert();
    } else {
      dispatch(loadAddMedicine(id, token, medicineName, details));
      if (saveMedicineData?.status === 'Success') {
        try {
          await AsyncStorage.setItem(
            'medicine_id',
            saveMedicineData.result.medicineId,
          );
          showSuccessMessage();
          setModal(false);
        } catch (error) {
          console.log(error, 'error');
        }
      }
    }
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

  const getStock = ({data}) => {
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
            <View>
              <TouchableOpacity onPress={() => setdata(item)}>
                <ListItem.Subtitle style={styles.patientName}>
                  Medicine Name: {`${item.medicineName}`}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{marginLeft: 3, fontSize: 15}}>
                  Description: {`${item.description}`}
                </ListItem.Subtitle>
              </TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
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
    } else if (medicineId === '') {
      showMedicineAlert();
    } else if (prescriptionId === '') {
      showPrescriptionAlert();
    } else {
      let obj = {
        MedicineName: userMedicineName,
        MedicineDescription: userMedicineDescription,
        dosageType: pill,
        dosageQuantity: dosageQuantity,
        dosageUnit: doseType,
        stock: stock,
        leftStock: remainingStock,
      };
      setArr([...arr, obj]);
      if (id !== null || token !== null) {
        dispatch(
          loadSaveUserMedicine(
            id,
            token,
            prescriptionId,
            medicineId,
            pill,
            dosageQuantity,
            doseType,
            stock,
            remainingStock,
          ),
        );

        if (id === null) {
          console.log(arr, 'savedddd');
          navigation?.navigate('MedicinePanel');
        }
        if (saveUserMedicineData?.status === 'Success') {
          showSuccessMessage();
          navigation.navigate('Home');
        }
      }
    }
  };

  useEffect(() => {
    if (
      pill !== null &&
      medicineName !== null &&
      doseType !== null &&
      dosageQuantity !== null &&
      stock !== null &&
      remainingStock !== null
    ) {
      AddMedicine(arr);
    } else {
      console.log('else');
    }
  }, [arr]);

  let save_Medicine = () => {
    console.log(pill, 'pills');
    if (
      userMedicineName === '' ||
      pill === '' ||
      stock === '' ||
      remainingStock === '' ||
      dosageQuantity === '' ||
      doseType === ''
    ) {
      showAlert();
      return;
    }

    console.log('else');
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_medicine (medicine_name,dosage_Type,dosage_Quantity,dosage_Unit,stock,left_Stock) VALUES(?,?,?,?,?)',
        [
          userMedicineName,
          pill,
          doseType,
          dosageQuantity,
          stock,
          remainingStock,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            showSuccessMessage();
          }
        },
      );
    });
  };

  const addMedicine = async () => {
    if (
      pill === '' ||
      stock === '' ||
      remainingStock === '' ||
      dosageQuantity === '' ||
      doseType === ''
    ) {
      showAlert();
    }
    if (medicineId === '') {
      showMedicineAlert();
    }
    if (prescriptionId === '') {
      showPrescriptionAlert();
    } else {
    }
  };

  return (
    <View style={Styles.addMedicinePage}>
      <Toast visibilityTime={3000} />
      <Modal visible={modal}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Ionicons name="close" size={30} />
          </TouchableOpacity>
          <View style={Styles.modalHeader}>
            <ModalHeader />
          </View>
          <View style={Styles.modalContainer}>
            <ScrollView style={Styles.medicineModal}>
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
                <View
                  style={{
                    right: 10,
                    flex: 1,
                    position: 'absolute',
                    marginTop: '7%',
                  }}>
                  <TouchableOpacity onPress={() => setSearchModal(true)}>
                    <FontAwesomeIcon
                      size={25}
                      icon={faSearch}
                      color={colorPalette.mainColor}
                    />
                  </TouchableOpacity>
                </View>
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
            </ScrollView>
            <TouchableOpacity
              onPress={() =>
                saveMedicineModal(token, id, medicineName, details)
              }>
              <SaveButton />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={searchModal}>
        <View style={{margin: '5%'}}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setSearchModal(false);
            }}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={30}
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
          {tempSearch[0]?.length === 0 ? (
            <></>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={tempSearch[0]?.result}
              renderItem={renderItem}
              numColumns={1}
            />
          )}
        </View>
      </Modal>
      <View style={Styles.addMedicinesHeader}>
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
      </View>
      <View style={Styles.constainer}>
        <ScrollView>
          <KeyboardAvoidingView>
            {id !== null ? (
              <TouchableOpacity onPress={() => setModal(true)}>
                <SelectMedicineName medicineName={medicineName} />
              </TouchableOpacity>
            ) : (
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
            )}

            <View style={Styles.picker}>
              <Picker
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
            <View style={Styles.textView}>
              <View style={{width: '50%'}}>
                <TextInput
                  style={{width: '97%'}}
                  id="name"
                  label="Dose Quantity"
                  value={dosageQuantity}
                  mode="outlined"
                  onChangeText={text => setDosageQuantity(text)}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                />
              </View>
              <View style={{width: '50%'}}>
                <TextInput
                  id="name"
                  style={{width: '97%'}}
                  label="Dose Unit"
                  value={doseType}
                  mode="outlined"
                  onChangeText={setDoseType}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
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
            {id !== null ? (
              <View style={Styles.textView}>
                <View style={Styles.textbox}>
                  <Text style={Styles.text}>Add Prescription Here </Text>
                </View>

                <TouchableOpacity
                  style={Styles.touchableOpacity}
                  onPress={() => {
                    navigation.navigate('addPrescriptionPanel');
                  }}>
                  <LottieView
                    style={Styles.addPrescriptionIcon}
                    speed={0.7}
                    RemainingStock
                    progress={progress}
                    source={require('../../../assets/animation/addPrescriptionButton.json')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              style={Styles.touchableOpacity}
              onPress={
                () =>
                  addMedicineInLocalStorage(
                    id,
                    token,
                    prescriptionId,
                    medicineId,
                    pill,
                    dosageQuantity,
                    doseType,
                    stock,
                    remainingStock,
                  )
                // {save_Medicine()}
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
