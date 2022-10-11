import {Text, View, Image} from 'react-native';
import React from 'react';
import styles from '../../styles/otherScreensStyles/aboutAppStyles';
import SubHeader from '../../components/molecules/headers/subHeader';
const About = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SubHeader title={'About'} navigation={navigation} />
      <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={require('../../assets/images/medstick.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Medicine Adherence app which allows user to use medicine, reminder,
          caretaker, patient, report and more features and never skip their
          medications.
        </Text>
      </View>
    </View>
  );
};

export default About;
