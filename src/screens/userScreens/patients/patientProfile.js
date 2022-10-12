import {View, Image} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import * as Animatable from 'react-native-animatable';
import {
  faCalendarCheck,
  faDroplet,
  faEnvelope,
  faFlag,
  faLocationDot,
  faMarsAndVenus,
  faPhone,
  faSortNumericUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../styles/careTakerStyles/careTakerProfileStyles';
import Divider from '../../../components/atoms/divider';
import ProfileField from '../careTaker/profileField';

const PatientProfile = ({navigation, route}) => {
  const item = route.params.profile;
  console.log(item);

  return (
    <>
      <View style={styles.sd}>
        <View style={styles.background} />
        <SubHeader navigation={navigation} />
        <View style={styles.imgCont}>
          <Image source={{uri: item.picPath}} style={styles.img} />
        </View>
        <View style={styles.sdContainer}>
          <Animatable.View animation="zoomInUp" duration={400}>
            <ProfileField icon={faUser} value={item.userName} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField icon={faEnvelope} value={item.email} />
            <ProfileField icon={faPhone} value={item.contact} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField icon={faCalendarCheck} value={item.dateOfBirth} />
            <ProfileField icon={faFlag} value={item.country} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField icon={faDroplet} value={item.bloodGroup} />
            <ProfileField icon={faMarsAndVenus} value={item.gender} />
          </Animatable.View>
        </View>
      </View>
    </>
  );
};

export default PatientProfile;
