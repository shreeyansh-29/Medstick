import {View, Image} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import * as Animatable from 'react-native-animatable';
import {
  faDroplet,
  faEnvelope,
  faLocationDot,
  faMarsAndVenus,
  faPhone,
  faSortNumericUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../styles/careTakerStyles/careTakerProfileStyles';
import Divider from '../../../components/atoms/divider';
import ProfileField from './profileField';

const CareTakerProfile = ({navigation}) => {
  const [img, imgstate] = useState('https://i.stack.imgur.com/l60Hf.png');
  return (
    <>
      <View style={styles.sd}>
        <View style={styles.background} />
        <SubHeader navigation={navigation} />
        <View style={styles.imgCont}>
          <Image
            source={require('../../../assets/images/shreeyansh.jpg')}
            style={styles.img}
          />
        </View>
        <View style={styles.sdContainer}>
          <Animatable.View animation="zoomInUp" duration={400}>
            <ProfileField icon={faUser} value={'Shreeyansh Singh'} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField
              icon={faLocationDot}
              value={'Sec-14/339, Vikas Nagar, Lucknow  '}
            />
            <ProfileField icon={faPhone} value={'9695072060, 7451942905'} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField
              icon={faEnvelope}
              value={'shreeyansh.singh@nineleaps.com'}
            />
            <ProfileField icon={faMarsAndVenus} value={'Male'} />
            <Divider contStyle={styles.lineCont} lineStyle={styles.line} />
            <ProfileField icon={faDroplet} value={'O+'} />
            <ProfileField icon={faSortNumericUp} value={'21 yrs'} />
          </Animatable.View>
        </View>
      </View>
    </>
  );
};

export default CareTakerProfile;
