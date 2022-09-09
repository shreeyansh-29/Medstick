import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { styles } from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import SubHeader from '../../../components/molecules/headers/subHeader';

const AddMedicine = ({ navigation }) => {
  const [medicineName, setMedicineName] = useState('');
  const [dose, setDose] = useState('');
  const [pill, setPill] = useState('');
  const [doseType, setDoseType] = useState('');
  const [stock, setStock] = useState('');
  const [limitStock, setLimitStock] = useState('');
  const [prescription, setPrescription] = useState('');
  // console.log(doseType, 'type');
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
    <View style={{ flex: 1 }}>
      <SubHeader title={'Add Medicine'} navigation={navigation} />
      <View style={styles.constainer}>
        <ScrollView>
          <KeyboardAvoidingView>
            <TextInput
              id="name"
              label="Medicine Name"
              value={medicineName}
              mode="outlined"
              onChangeText={text => setMedicineName(text)}
              outlineColor="#008A81"
              activeOutlineColor="#008A81"
            />
            <View
              style={{
                width: '100%',
                marginTop: 15,
                marginLeft: 20,
                marginRight: 20,
                borderColor: '#008A81',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                alignSelf: 'center',
                borderRadius: 5,
              }}>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TextInput
                style={{ width: '48%' }}
                id="name"
                label="Dose"
                value={dose}
                mode="outlined"
                onChangeText={text => setDose(text)}
                outlineColor="#008A81"
                activeOutlineColor="#008A81"
              />
              <TextInput
                id="name"
                style={{ width: '50%' }}
                label="Dose Type"
                value={doseType}
                disabled="true"
                mode="outlined"
                onChangeText={setDoseType}
                outlineColor="#008A81"
                activeOutlineColor="#008A81"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{ margin: 15, fontSize: 18, color: '#008A81' }}>
                Stock Unit
              </Text>
              <TextInput
                id="name"
                style={{ width: '47%' }}
                label="units"
                value={stock}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setStock(text)}
                outlineColor="#008A81"
                activeOutlineColor="#008A81"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{ margin: 10, fontSize: 18, color: '#008A81' }}>
                Notify me when only{' '}
              </Text>
              <TextInput
                id="name"
                style={{ width: '47%' }}
                label="units"
                value={limitStock}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setLimitStock(text)}
                outlineColor="#008A81"
                activeOutlineColor="#008A81"
              />
            </View>
            <TextInput
              id="name"
              label="Prescription"
              value={prescription}
              mode="outlined"
              onChangeText={text => setPrescription(text)}
              outlineColor="#008A81"
              activeOutlineColor="#008A81"
              numberOfLines={5}
              multiline={true}
            />
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity>
                <LottieView
                  style={{ width: 50 }}
                  autoPlay
                  loop
                  source={require('../../../assets/animation/saveButton.json')}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default AddMedicine;
