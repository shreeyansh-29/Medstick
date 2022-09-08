import {Text, View, Image} from 'react-native';
import React from 'react';
import styles from '../../styles/aboutAppStyles';

const About = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Medstick_1.png')}
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
