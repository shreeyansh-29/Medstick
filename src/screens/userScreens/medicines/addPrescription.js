import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import AddPrescriptionHeader from '../../../components/molecules/headers/addPrescriptionHeader';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import AddPrescriptionList from '../../../components/molecules/addPrescriptionList';
import SaveButton from '../../../components/molecules/saveButton';
import {colorPalette} from '../../../components/atoms/colorPalette';

const AddPrescription = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorPalette.appColor,
      }}>
      <View style={{flex: 1}}>
        <AddPrescriptionHeader navigation={navigation} />
      </View>

      <View style={{flex: 2, backgroundColor: colorPalette.basicColor}}>
        <AddPrescriptionList navigation={navigation} />
      </View>
    </View>
  );
};

export default AddPrescription;
