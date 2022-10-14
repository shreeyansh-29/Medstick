import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Modal,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AddMedicinesHeader from '../../../components/molecules/headers/addMedicinesHeader';
import { styles } from '../../../styles/homeScreenStyles/headerStyles';
import { colorPalette } from '../../../components/atoms/colorPalette';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SelectMedicineName from '../../../components/atoms/selectMedicineName';
import TotalStock from '../../../components/molecules/totalStock';
import LeftStock from '../../../components/molecules/leftStock';
import ModalHeader from '../../../components/molecules/headers/modalHeader';
import SaveButton from '../../../components/molecules/saveButton';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadAddMedicine } from '../../../redux/action/userMedicine/addMedicineAction';
import { showSuccessMessage } from '../../../components/atoms/successMessage';
import Toast from 'react-native-toast-message'
import AddMedicineButton from '../../../components/atoms/addMedicineButton';
import { loadSaveUserMedicine } from '../../../redux/action/userMedicine/saveUserMedicineAction';
const AddMedicines = ({ navigation }) => {


  const [medicineName, setMedicineName] = useState('');
  const [details, setDeatils] = useState('')
  const [modal, setModal] = useState(false)
  const [dose, setDose] = useState('');
  const [pill, setPill] = useState('');
  const [stock, setStock] = useState('');
  const [remainingStock, setRemainingStock] = useState('');
  const [token, setToken] = useState('');
  const [medicineId, setMedicineId] = useState('')
  const [id, setId] = useState('')
  const [prescriptionId, setPrescriptionId] = useState('')
  const [doseType, setDoseType] = useState('');
  const saveMedicineData = useSelector(state => state.addMedicineReducer?.data)
  const saveMedicine = useSelector(state => state.addMedicineReducer)
  const dispatch = useDispatch()
  const saveUserMedicineData=useSelector(state=>state.saveUserMedicineReducer)
  console.log(saveUserMedicineData,"saveUserMedicine")
  console.log(saveMedicine,"saveMedicine")
  const payload={pill,dose,doseType,stock,remainingStock}
  console.log(payload,"all")
  const getTokenId = async () => {

    try {
      const tokentemp = await AsyncStorage.getItem('accessToken')
      if (tokentemp !== null) {
        setToken(tokentemp)
      }
    }
    catch (error) {
      console.log(error, "error")
    }
    const tempId = await AsyncStorage.getItem('user_id')
    setId(tempId)
  }

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    getTokenId()
  }, [])

  const showSuccessMessage = () => {
    Alert.alert('Success', 'Medicine Added Successfully', [{
      text: 'OK'
    }],
      { cancelable: false }
    )
  }
  const showPrescriptionAlert = () => {
    Alert.alert('Warning', 'No prescription added', [{
      text: 'OK'
    }],
      { cancelable: false }
    )
  }

  const showMedicineAlert = () => {
    Alert.alert('Warning', 'select the medicine name', [{ text: 'OK' }],
      {
        cancelable: false
      })
  }

  const showAlert = () => {
    Alert.alert('Warning', 'Fill all the boxs', [{
      text: 'OK',
    }],
      { cancelable: false })
  }

  const saveMedicineModal = async () => {

    if (medicineName === "" || details === "") {
      showAlert()
    }
    else {
      dispatch(loadAddMedicine(id, token, medicineName, details))
      if (saveMedicineData?.status === 'Success') {
        try {
          await AsyncStorage.setItem('medicine_id', (saveMedicineData.result.medicineId))
          showSuccessMessage()
          setModal(false)
        }
        catch (error) {
          console.log(error, "error")
        }
      }
    }
  }
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
        setDoseType('dose');
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
    const tempPrescriptionId = await AsyncStorage.getItem('prescription_id')
    const tempMedicineId = await AsyncStorage.getItem('medicine_id')
    setMedicineId(tempMedicineId )
    setPrescriptionId(tempPrescriptionId)
  }
  useEffect(() => {
    fetchPrescriptionAndMedicineId()
  }, [])

  const getStock = (data) => {
    setStock(data)
  }

  const getRemainingStock = (data) => {
    setRemainingStock(data)
  }


  const addMedicine = async() => {
    if (pill === '' || stock === '' || remainingStock === '' || dose === '' || doseType === '') {
      showAlert()
    }
    if (medicineId === '') {
      showMedicineAlert()
    }
    if (prescriptionId === '') {
        showPrescriptionAlert()
    }
    else{
      dispatch(loadSaveUserMedicine(id,token,prescriptionId,medicineId,pill,dose,doseType,stock,remainingStock))
      if(saveUserMedicineData?.status === 'Success')
      {
      showSuccessMessage()
      navigation.navigate('Home')
    }
  }
  }

  return (
    <View style={Styles.addMedicinePage}>
      <Toast visibilityTime={3000} />
      <Modal visible={modal} >
        <View style={{ flex: 1}}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <Ionicons name='close' size={30} />
          </TouchableOpacity>
          <View style={Styles.modalHeader}>
            <ModalHeader />
          </View>
          <View style={Styles.modalContainer}>
            <ScrollView style={Styles.medicineModal}>
              <TextInput
                id="name"
                label="Medicine Name"
                value={medicineName}
                mode="outlined"
                onChangeText={text => setMedicineName(text)}
                outlineColor="#02aba6"
                activeOutlineColor="#02aba6"
              />
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
            <TouchableOpacity onPress={() => saveMedicineModal(token, id, medicineName, details)}>
              <SaveButton />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={Styles.addMedicinesHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.pop();
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
            <TouchableOpacity onPress={() => setModal(true)}>
              <SelectMedicineName
                medicineName={medicineName}
              />
            </TouchableOpacity>

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
              <View style={{ width: '50%' }}>
                <TextInput
                  style={{ width: '97%' }}
                  id="name"
                  label="Dose"
                  value={dose}
                  mode="outlined"
                  onChangeText={text => setDose(text)}
                  outlineColor="#02aba6"
                  activeOutlineColor="#02aba6"
                />
              </View>
              <View style={{ width: '50%' }}>
                <TextInput
                  id="name"
                  style={{ width: '97%' }}
                  label="Dose Type"
                  value={doseType}
                  disabled="true"
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
                <TotalStock
                  onChange={getStock}
                />
              </View>
            </View>
            <View
              style={Styles.textView}>
              <View style={Styles.textbox}>
                <Text style={Styles.text}>Notify me when only </Text>
              </View>
              <View>
                <LeftStock
                  onChange={getRemainingStock}
                />
              </View>
            </View>
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
                  progress={progress}
                  source={require('../../../assets/animation/addPrescriptionButton.json')}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={Styles.touchableOpacity} onPress={() => addMedicine(id,token,prescriptionId,medicineId,pill,dose,doseType,stock,remainingStock)}>
              <SaveButton />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default AddMedicines;
