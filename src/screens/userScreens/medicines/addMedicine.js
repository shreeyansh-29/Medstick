import {View, Text} from 'react-native';
import React from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';

const AddMedicine = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <SubHeader title={'Add Medicine'} navigation={navigation} />
    </View>
  );
};

export default AddMedicine;
