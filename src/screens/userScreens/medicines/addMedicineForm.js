import {View, Text, TouchableOpacity, Animated} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import InputField from '../../../components/atoms/inputField';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {Picker} from '@react-native-picker/picker';
import {Divider, TextInput} from 'react-native-paper';
import CustomButton from '../../../components/atoms/customButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import CustomModal from '../../../components/molecules/customModal';
import RenderModalView from './renderModalView';

const AddMedicineForm = props => {
  const progress = useRef(new Animated.Value(0)).current;
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);

  useFocusEffect(() => {
    async function checkforlog() {
      const Id = await AsyncStorage.getItem('user_id');
      setId(Id);
    }
    checkforlog();
  });

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
        marginTop: 16,
        width: '90%',
        alignSelf: 'center',
      }}>
      <CustomModal
        modalVisible={visible}
        type="fade"
        onRequestClose={() => setVisible(!visible)}
        modalView={<RenderModalView {...props} setVisible={setVisible} />}
        customStyles={{height: '100%'}}
      />
      <View style={{marginVertical: 6}}>
        {props.connection && id === null ? (
          <>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              activeOpacity={1}
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: 'lightgrey',
                borderRadius: 4,
                height: 60,
                justifyContent: 'center',
              }}>
              <Text style={{marginLeft: 12, fontSize: 16, color: 'grey'}}>
                Medicine Name
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <InputField
              styles={{backgroundColor: 'white'}}
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
          </>
        )}
      </View>
      <View style={{marginVertical: 6}}>
        <InputField
          styles={{height: 100, backgroundColor: 'white'}}
          label="Description"
          mode="outlined"
          outlineColor="lightgrey"
          text="description"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.description}
          multiline={true}
          selectTextOnFocus={true}
          dense={true}
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
            marginTop: 6,
          }}>
          <View style={Styles.picker}>
            <Picker
              style={{
                color: 'black',
                height: 56,
              }}
              dropdownIconColor={1}
              selectedValue={props.pill}
              onValueChange={val => props.setPill(val)}>
              <Picker.Item label="Tablet" value="Tablet" />
              <Picker.Item label="Inhaler" value="Inhaler" />
              <Picker.Item label="Injection" value="Injection" />
              <Picker.Item label="Syrup" value="Syrup" />
            </Picker>
          </View>
        </View>
        <View style={{width: '50%'}}>
          <InputField
            styles={{backgroundColor: 'white'}}
            label="Dosage Quantity"
            mode="outlined"
            outlineColor="lightgrey"
            text="dosageQuantity"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.dosageQuantity}
            keyboardType="numeric"
          />
          {props.errors.dosageQuantity && props.touched.dosageQuantity && (
            <Text style={{color: 'red', marginTop: 4}}>
              {props.errors.dosageQuantity}
            </Text>
          )}
        </View>
      </View>

      <View style={Styles.textView1}>
        <View style={{width: '50%'}}>
          <InputField
            styles={{width: '97%', backgroundColor: 'white'}}
            text="dosagePower"
            label="Dosage Power"
            value={props.values.dosagePower}
            mode="outlined"
            outlineColor="lightgrey"
            keyboardType="numeric"
            placeholderTextColor={'grey'}
            activeOutlineColor={colorPalette.mainColor}
            {...props}
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
            style={{width: '100%', backgroundColor: 'white'}}
            label="Dose Type"
            value={props.doseType}
            mode="outlined"
            onChangeText={props.setDoseType}
            outlineColor="#02aba6"
            activeOutlineColor="#02aba6"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      <View style={Styles.textView1}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Stock Unit</Text>
        </View>
        <View
          style={{
            width: '50%',
            alignItems: 'center',
          }}>
          <InputField
            styles={{width: '60%', backgroundColor: 'white'}}
            label="Units"
            mode="outlined"
            outlineColor="lightgrey"
            text="stocks"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.stocks}
            keyboardType="numeric"
          />
          {props.errors.stocks && props.touched.stocks && (
            <Text style={{color: 'red', marginTop: 4}}>
              {props.errors.stocks}
            </Text>
          )}
        </View>
      </View>
      <View style={Styles.textView1}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Notify me when only </Text>
        </View>
        <View style={{width: '50%', alignItems: 'center'}}>
          <InputField
            styles={{width: '60%', backgroundColor: 'white'}}
            label="Units"
            mode="outlined"
            outlineColor="lightgrey"
            text="notify"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.notify}
            keyboardType="numeric"
          />
          {props.errors.notify && props.touched.notify && (
            <Text style={{color: 'red', marginTop: 4}}>
              {props.errors.notify}
            </Text>
          )}
        </View>
      </View>
      <View style={Styles.textView}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Add Prescription Here </Text>
          <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
            (Optional)
          </Text>
        </View>

        {props.add ? (
          <View
            style={{
              width: '43%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <CustomButton
              title={'Added'}
              btnStyles={{
                backgroundColor: colorPalette.mainColor,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                props.setAdd(false);
              }}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                color={colorPalette.redPercentageColor}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: '50%',
              alignItems: 'center',
            }}>
            <CustomButton
              title={'Add'}
              handleSubmit={() => {
                props.navigation.navigate('AddPrescriptionPanel', {
                  prescriptionObject: props.prescriptionObject,
                });
              }}
              btnStyles={{
                backgroundColor: colorPalette.mainColor,
                paddingHorizontal: 20,
                borderRadius: 5,
              }}
            />
            {/* <TouchableOpacity
              activeOpacity={1}
              style={Styles.touchableOpacity}
              onPress={() => {
                props.navigation.navigate('AddPrescriptionPanel', {
                  prescriptionObject: props.prescriptionObject,
                });
              }}>
              <LottieView
                style={Styles.addPrescriptionIcon}
                speed={0.7}
                progress={progress}
                source={require('../../../assets/animation/addPrescriptionButton.json')}
              />
            </TouchableOpacity> */}
          </View>
        )}
      </View>
      <Divider style={{height: 1, marginTop: 8}} />
      <CustomButton
        title={'Save'}
        handleSubmit={props.handleSubmit}
        contStyles={{alignItems: 'center', marginVertical: 24}}
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
