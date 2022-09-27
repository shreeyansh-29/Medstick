import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddMedicinesHeader from '../../../components/molecules/headers/addMedicinesHeader';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';

const AddMedicines = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const [medicineName, setMedicineName] = useState('');
  const [dose, setDose] = useState('');
  const [pill, setPill] = useState('');
  const [doseType, setDoseType] = useState('');
  const [stock, setStock] = useState('');
  const [limitStock, setLimitStock] = useState('');
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
  return (
    <View style={Styles.addMedicinePage}>
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
            <TextInput
              id="name"
              label="Medicine Name"
              value={medicineName}
              mode="outlined"
              onChangeText={text => setMedicineName(text)}
              outlineColor="#02aba6"
              activeOutlineColor="#02aba6"
            />
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
              <TextInput
                style={{width: '47%'}}
                id="name"
                label="Dose"
                value={dose}
                mode="outlined"
                onChangeText={text => setDose(text)}
                outlineColor="#02aba6"
                activeOutlineColor="#02aba6"
              />
              <TextInput
                id="name"
                style={{width: '47%'}}
                label="Dose Type"
                value={doseType}
                disabled="true"
                mode="outlined"
                onChangeText={setDoseType}
                outlineColor="#02aba6"
                activeOutlineColor="#02aba6"
              />
            </View>
            <View style={Styles.textView}>
              <Text style={Styles.text}>Stock Unit</Text>
              <TextInput
                id="name"
                style={{width: '47%'}}
                label="units"
                value={stock}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setStock(text)}
                outlineColor="#02aba6"
                activeOutlineColor="#02aba6"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={Styles.text}>Notify me when only </Text>
              <TextInput
                id="name"
                style={{width: '47%'}}
                label="units"
                value={limitStock}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setLimitStock(text)}
                outlineColor="#02aba6"
                activeOutlineColor="#02aba6"
              />
            </View>
            <View style={Styles.textView}>
              <Text style={Styles.text}>Add Prescription Here </Text>
              <TouchableOpacity
                style={Styles.touchableOpacity}
                onPress={() => {
                  navigation.navigate('Prescription');
                }}>
                <LottieView
                  style={Styles.addPrescriptionIcon}
                  speed={0.7}
                  progress={progress}
                  source={require('../../../assets/animation/addPrescriptionButton.json')}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={Styles.touchableOpacity}>
              <LottieView
                style={Styles.savelogo}
                speed={0.8}
                progress={progress}
                source={require('../../../assets/animation/saveButton.json')}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default AddMedicines;
