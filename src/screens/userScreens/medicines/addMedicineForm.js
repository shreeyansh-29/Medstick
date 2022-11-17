import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import InputField from '../../../components/atoms/inputField';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {Picker} from '@react-native-picker/picker';
import {Divider, TextInput} from 'react-native-paper';
import TotalStock from '../../../components/molecules/totalStock';
import LeftStock from '../../../components/molecules/leftStock';
import LottieView from 'lottie-react-native';
import CustomButton from '../../../components/atoms/customButton';

const AddMedicineForm = props => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View
      style={{
        marginTop: 6,
        width: '90%',
        alignSelf: 'center',
        // backgroundColor: 'yellow',
      }}>
      <View style={{marginVertical: 4}}>
        <InputField
          styles={{}}
          label="Medicine Name"
          mode="outlined"
          outlineColor="lightgrey"
          text="medicineName"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.medicineName}
        />
        {props.errors.medicineName && props.touched.medicineName && (
          <Text style={{color: 'red', marginTop: 4}}>
            {props.errors.medicineName}
          </Text>
        )}
      </View>
      <View style={{marginVertical: 4}}>
        <InputField
          styles={{height: 100}}
          label="Description"
          mode="outlined"
          outlineColor="lightgrey"
          text="description"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.description}
        />
        {props.errors.description && props.touched.description && (
          <Text style={{color: 'red', marginTop: 4}}>
            {props.errors.description}
          </Text>
        )}
      </View>

      <View style={Styles.textView1}>
        <View
          style={{
            width: '48%',
            justifyContent: 'flex-end',
          }}>
          <View style={Styles.picker}>
            <Picker
              style={{
                color: 'black',
                height: 56,
              }}
              selectedValue={props.values.pill}
              onValueChange={value => props.setPill(value)}>
              <Picker.Item label="Tablet" value="tablet" />
              <Picker.Item label="Inhaler" value="inhaler" />
              <Picker.Item label="Injection" value="injection" />
              <Picker.Item label="Syrup" value="syrup" />
            </Picker>
          </View>
          {props.errors.dosageQuantity && props.touched.dosageQuantity && (
            <Text style={{color: 'white', marginTop: 4}}>
              {props.errors.dosageQuantity}
            </Text>
          )}
        </View>
        <View style={{width: '50%'}}>
          <InputField
            styles={{}}
            label="Dosage Quantity"
            mode="outlined"
            outlineColor="lightgrey"
            text="dosageQuantity"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.dosageQuantity}
          />
          {props.errors.dosageQuantity && props.touched.dosageQuantity && (
            <Text style={{color: 'red', marginTop: 4}}>
              {props.errors.dosageQuantity}
            </Text>
          )}
        </View>
      </View>
      <View style={Styles.textView}>
        <View style={{width: '50%'}}>
          <TextInput
            style={{width: '97%'}}
            label="Dosage Power"
            value={props.values.dosagePower}
            mode="outlined"
            outlineColor="#02aba6"
            activeOutlineColor="#02aba6"
            keyboardType="numeric"
            placeholderTextColor={'grey'}
          />
          {props.errors.dosagePower && props.touched.dosagePower && (
            <Text style={{color: 'red', marginTop: 4}}>
              {props.errors.dosagePower}
            </Text>
          )}
        </View>
        <View style={{width: '50%'}}>
          <TextInput
            disabled
            id="name"
            style={{width: '97%'}}
            label="Dose Type"
            value={props.values.doseType}
            mode="outlined"
            onChangeText={props.setDoseType}
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
          <TotalStock onChange={() => {}} />
        </View>
      </View>
      <View style={Styles.textView}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Notify me when only </Text>
        </View>
        <View>
          <LeftStock onChange={() => {}} />
        </View>
      </View>

      <View style={Styles.textView}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Add Prescription Here </Text>
          <Text>Optional</Text>
        </View>

        <TouchableOpacity
          style={Styles.touchableOpacity}
          onPress={() => {
            props.navigation.navigate('addPrescriptionPanel');
          }}>
          <LottieView
            style={Styles.addPrescriptionIcon}
            speed={0.7}
            progress={progress}
            source={require('../../../assets/animation/addPrescriptionButton.json')}
          />
        </TouchableOpacity>
      </View>
      <Divider style={{height: 1, marginTop: 14}} />

      <CustomButton
        title={'Save'}
        handleSubmit={props.handleSubmit}
        contStyles={{alignItems: 'center', marginVertical: 40}}
        btnStyles={{
          backgroundColor: colorPalette.mainColor,
          width: '50%',
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default AddMedicineForm;
