import {View} from 'react-native';
import React from 'react';
import UploadPrescriptionBox from '../atoms/uploadPrescriptionBox';
import UploadPrescriptionText from '../atoms/uploadPrescriptionText';

const AddNewPrescription = ({navigation}) => {
  return (
    <View>
      <UploadPrescriptionText />
      <UploadPrescriptionBox navigation={navigation} />
    </View>
  );
};

export default AddNewPrescription;
