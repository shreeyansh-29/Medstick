import {
  Text,
  KeyboardAvoidingView,
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {TextInput} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {horizontalScale, verticalScale} from '../atoms/constant';
import {colorPalette} from '../atoms/colorPalette';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SaveButton from './saveButton';
import {Alert} from 'react-native';
import {showInvalidMessage} from '../atoms/invaliMessage';
import {useDispatch, useSelector} from 'react-redux';
import {loadSaveDoctorPrescription} from '../../redux/action/doctorPrescription/saveDoctorPrescriptionAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'
import { getPrescription, savePrescription } from '../../utils/storage';
const AddPrescriptionList = ({ navigation }) => {

  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [number, setNumber] = useState('');
  const [locations, setLocation] = useState('');
  const [id, setId] = useState('')
  const [token, setToken] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [arr, setArr] = useState('')
  console.log('array', arr)
  const dispatch = useDispatch()
  
  useEffect(() => {
    getPrescription().then(data => setArr(data))
  }, [])


  // useEffect(() => {
  //   if (saveDoctorPrescriptiondata?.status === 'Success') {
  //     setTimeout(() => {
  //       navigation.pop();
  //     }, 2000);
  //   }
  // }, [saveDoctorPrescriptiondata])

  const getTokenId = async () => {
    const tokentemp = await AsyncStorage.getItem('accessToken');
    setToken(tokentemp);
    const tempId = await AsyncStorage.getItem('user_id');
    setId(tempId);
  };

  const showAlertMessage = () => {
    Alert.alert(
      'Alert!!',
      'image is already selected ',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const showSuccesMessage = () => {
    Alert.alert(
      'Success',
      'Prescription Addded Succesfully ',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };

  const successfullyPrescriptionAdded = () => {


    showSuccesMessage()
    navigation.navigate('AddMedicine')

  }

  const savePrescriptionLocal = async () => {
    if (doctorName === '' || specialization === '' || number === '' || locations === '' || selectedImage === '') {
      showInvalidMessage()
    }


    else {
      let obj = {
        prescriptionId: uuid.v4(),
        doctorName: doctorName,
        specialization: specialization,
        contact: number,
        location: locations,
        prescriptionUrl: selectedImage.path
      }
      if (arr !== null) {
        setArr([...arr, obj])
      }
      else{
        setArr([obj])
      }
      setTimeout(()=>{
        navigation.navigate('AddMedicine',{
          data:obj
        })
      },300)

    }
  };

  useEffect(() => {
    savePrescription(arr)
  }, [arr])

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    getTokenId();
  }, [id]);
  return (
    <View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <TextInput
            id="Doctor's Name"
            style={{
              marginHorizontal: horizontalScale(12),
              marginBottom: verticalScale(6),
            }}
            label="Doctor's Name"
            value={doctorName}
            mode="outlined"
            onChangeText={text => setDoctorName(text)}
            outlineColor="#02ABA6"
            activeOutlineColor="#02ABA6"
          />
          <TextInput
            id="Specialization"
            label="Specialization"
            style={{
              marginHorizontal: horizontalScale(12),
              marginBottom: verticalScale(6),
            }}
            value={specialization}
            mode="outlined"
            onChangeText={text => setSpecialization(text)}
            outlineColor="#02ABA6"
            activeOutlineColor="#02ABA6"
          />
          <TextInput
            id="Number"
            label="Contact"
            style={{
              marginHorizontal: horizontalScale(12),
              marginBottom: verticalScale(6),
            }}
            value={number}
            mode="outlined"
            onChangeText={text => setNumber(text)}
            keyboardType="numeric"
            outlineColor="#02ABA6"
            activeOutlineColor="#02ABA6"
          />
          <TextInput
            id="Number"
            style={{
              marginHorizontal: horizontalScale(12),
              marginBottom: verticalScale(6),
            }}
            label="Location"
            value={locations}
            mode="outlined"
            onChangeText={text => setLocation(text)}
            outlineColor="#02ABA6"
            activeOutlineColor="#02ABA6"
          />
          <View style={Styles.addingPrescription}>
            {/* <View style={Styles.textInput}>
              <Text style={{fontSize: 17}}>Add Existing Prescription</Text>
            </View> */}
            {/*             
            <TouchableOpacity
              onPress={() => {
                {selectedImage !== ""?showAlertMessage():
                
                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then(image => {
                setSelectedImage(image)
                });
              }}
              }
              style={Styles.addingPrescriptionTouchable}>
              <LottieView
                style={Styles.addingPrescriptionIcon}
                speed={0.7}
                progress={progress}
                source={require('../../assets/animation/addPrescriptionButton.json')}
              />
              
            </TouchableOpacity> */}
          </View>
          <View style={Styles.addingPrescription}>
            <View style={Styles.textInput}>
              <Text style={Styles.text}>Add Prescription Image </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                {
                  selectedImage !== ''
                    ? showAlertMessage()
                    : ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true,
                      }).then(image => {
                        setSelectedImage(image);
                      });
                }
              }}>
              <LottieView
                style={Styles.addingPrescriptionIcon}
                speed={0.7}
                progress={progress}
                source={require('../../assets/animation/addPrescriptionButton.json')}
              />
            </TouchableOpacity>
          </View>

          {selectedImage !== '' ? (
            <Image
              source={{uri: `${selectedImage.path}`}}
              style={{width: 150, height: 150, margin: 15}}
            />
          ) : (
            <View></View>
          )}
          {/* <View style={Styles.box}>
            <Text style={{fontSize: 17, marginTop: '2%'}}>
              Add Appointment Remainder
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 5,
                left: '-7%',
              }}>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View style={Styles.box1}>
                  <Text style={Styles.text}>DateTime</Text>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={28}
                    color={colorPalette.mainColor}
                  />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    value={date}
                    mode="datetime"
                    onConfirm={date => {
                      console.log(date, ' date');
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </TouchableOpacity>
              {date == Date() ? (
                <View style={Styles.box2} >
                  <Text>
                       --/ -- /----
                  </Text>
                </View>
              ) : (
                <View style={Styles.box2}>
                  <Text style={{fontSize: 18}}>
                    {date?.getDate() +
                      '/' +
                      (date.getMonth() + 1) +
                      '/' +
                      date.getFullYear() +
                      '  ' +
                      date.getHours() +
                      ':' +
                      date.getMinutes()}
                  </Text>
                </View>
              )}
            </View>
          </View> */}
        </KeyboardAvoidingView>
        <TouchableOpacity style={Styles.saveButtonArea} onPress={() => savePrescriptionLocal()}>
          <SaveButton />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default AddPrescriptionList;
