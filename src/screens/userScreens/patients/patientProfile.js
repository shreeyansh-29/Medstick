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
  const {profile} = route.params.profile[0];
  console.log(profile);
  let img = '';

  return (
    <>
      <View style={styles.sd}>
        <View style={styles.background} />
        <SubHeader navigation={navigation} />
        <View style={styles.imgCont}>
          <Image
            source={{uri: profile.userDetails.picPath}}
            style={styles.img}
          />
        </View>
        <View style={styles.sdContainer}>
          <Animatable.View animation="zoomInUp" duration={400}>
            <ProfileField icon={faUser} value={profile.userName} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField icon={faEnvelope} value={profile.email} />
            <ProfileField icon={faPhone} value={profile.contact} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField
              icon={faCalendarCheck}
              value={profile.userDetails.dateOfBirth}
            />
            <ProfileField icon={faFlag} value={profile.userDetails.country} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField
              icon={faDroplet}
              value={profile.userDetails.bloodGroup}
            />
            <ProfileField
              icon={faMarsAndVenus}
              value={profile.userDetails.gender}
            />
          </Animatable.View>
        </View>
      </View>
    </>
  );
};

export default PatientProfile;
