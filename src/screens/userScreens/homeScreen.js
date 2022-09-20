import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './reminders';
import * as Animatable from 'react-native-animatable';
import {colorPalette} from '../../components/atoms/colorPalette';
import {Styles} from '../../styles/homeScreenStyles/performanceCircleStyles';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faEllipsisVertical,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import CircularProgress from 'react-native-circular-progress-indicator';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const medicines = [
  {name: 'Paracetamol', dose: '200mg'},
  {name: 'Paracetamol', dose: '200mg'},
  {name: 'Paracetamol', dose: '200mg'},
];

const HomeScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <MainHeader title={'Medstick'} />
        {/* <View style={{flex: 1, width: '100%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
            }}> */}
        <View style={styles.card}>
          <Calender />
          <PerformanceCircle styles={Styles} />
        </View>
        <Reminders />
        {/* </ScrollView>
        </View> */}
      </View>
    </>
  );
};

export default HomeScreen;
