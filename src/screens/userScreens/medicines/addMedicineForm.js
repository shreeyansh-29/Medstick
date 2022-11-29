import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../../../components/atoms/inputField';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {Picker} from '@react-native-picker/picker';
import {Divider, TextInput} from 'react-native-paper';
import CustomButton from '../../../components/atoms/customButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import CustomModal from '../../../components/molecules/customModal';
import {styles} from '../../../styles/medicinePanelStyles/medicineFormStyles';
import NetInfo from '@react-native-community/netinfo';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useIsFocused} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import RenderModalView from './renderModalView';

const AddMedicineForm = props => {
  const [visible, setVisible] = useState(false);
  const [connected, setConnected] = useState(false);
  const focused = useIsFocused();
  const [load, setLoad] = useState(false);
  const [med, setMed] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    if (user !== null) setLoad(true);
  };

  useEffect(() => {
    if (focused) {
      getUser();
    }
  }, [focused]);

  return (
    <View style={styles.mainView}>
      <CustomModal
        modalVisible={visible}
        type="fade"
        onRequestClose={() => setVisible(!visible)}
        modalView={
          <RenderModalView
            props={props}
            setVisible={setVisible}
            setMed={setMed}
            setDescription={setDescription}
          />
        }
        customStyles={{height: '100%'}}
      />
      <View style={styles.inputField}>
        <InputField
          styles={styles.field}
          label="Medicine Name"
          mode="outlined"
          outlineColor="lightgrey"
          text="medicineName"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={med.length !== 0 ? med : props.values.medicineName}
          right={
            connected && load ? (
              <TextInput.Icon
                onPress={() => setVisible(true)}
                name={() => (
                  <FontAwesomeIcon
                    size={20}
                    icon={faSearch}
                    color={colorPalette.mainColor}
                  />
                )}
              />
            ) : null
          }
        />
        {props.errors.medicineName && props.touched.medicineName && (
          <Text style={styles.errorText}>{props.errors.medicineName}</Text>
        )}
      </View>
      <View style={styles.inputField}>
        <InputField
          styles={styles.description}
          label="Description"
          mode="outlined"
          outlineColor="lightgrey"
          text="description"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={
            description.length !== 0 ? description : props.values.description
          }
          multiline={true}
          selectTextOnFocus={true}
          dense={true}
        />
        {props.errors.description && props.touched.description && (
          <Text style={styles.errorText}>{props.errors.description}</Text>
        )}
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.pickerView}>
          <View style={styles.picker}>
            <Picker
              style={styles.pickerField}
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
        <View style={styles.subInputGroup}>
          <InputField
            styles={styles.field}
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
            <Text style={styles.errorText}>{props.errors.dosageQuantity}</Text>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.subInputGroup}>
          <InputField
            styles={[styles.field, {width: '97%'}]}
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
            <Text style={styles.errorText}>{props.errors.dosagePower}</Text>
          )}
        </View>
        <View style={styles.subInputGroup}>
          <TextInput
            disabled
            style={styles.field}
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
      <View style={styles.inputGroup}>
        <View style={styles.textbox}>
          <Text style={styles.text}>Stock Unit</Text>
        </View>
        <View style={styles.unitBox}>
          <InputField
            styles={[styles.field, {width: '60%'}]}
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
        <View style={styles.unitBox}>
          <InputField
            styles={[styles.field, {width: '60%'}]}
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
            <Text style={styles.errorText}>{props.errors.notify}</Text>
          )}
        </View>
      </View>
      <View style={Styles.textView}>
        <View style={Styles.textbox}>
          <Text style={Styles.text}>Add Prescription Here </Text>
          <Text style={styles.subText}>(Optional)</Text>
        </View>

        {props.add ? (
          <View style={styles.addedBtn}>
            <CustomButton
              title={'Added'}
              btnStyles={{
                backgroundColor: 'white',
                borderRadius: 5,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: colorPalette.mainColor,
              }}
              titleStyle={{color: colorPalette.mainColor}}
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
          <View style={styles.addBtn}>
            <CustomButton
              title={'Add'}
              handleSubmit={() => {
                if (props.values.medicineName.length !== 0) {
                  props.navigation.navigate('AddPrescriptionPanel', {
                    prescriptionObject: props.prescriptionObject,
                  });
                } else {
                  Alert.alert('Fill rest details first', '', [
                    {
                      text: 'Ok',
                      onPress: () => {},
                    },
                  ]);
                }
              }}
              btnStyles={styles.btnStyles}
            />
          </View>
        )}
      </View>
      <Divider style={styles.divider} />
      <CustomButton
        title={'Save'}
        handleSubmit={props.handleSubmit}
        contStyles={styles.contStyles}
        btnStyles={styles.saveBtn}
      />
    </View>
  );
};

export default AddMedicineForm;
