import {View, Text, ScrollView, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddPrescriptionHeader from '../../../components/molecules/headers/addPrescriptionHeader';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import AddPrescriptionList from '../../../components/molecules/addPrescriptionList';
import SaveButton from '../../../components/molecules/saveButton';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import LottieView from 'lottie-react-native';
import CustomModal from '../../../components/molecules/customModal';

const AddPrescription = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    // console.log('use');
  }, []);

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
        flex: 1,
        backgroundColor: colorPalette.appColor,
      }}>
      {/* <View style={{flex: 1}}>
        <AddPrescriptionHeader navigation={navigation} />
      </View> */}
      <SubHeader navigation={navigation} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
          style={{width: '50%'}}
          speed={0.7}
          source={require('../../../assets/animation/addPrescription.json')}
          progress={progress}
        />
      </View>

      <View style={{flex: 1, backgroundColor: 'white'}}>
        <AddPrescriptionList />
      </View>
    </View>
  );
};

export default AddPrescription;
