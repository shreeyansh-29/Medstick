import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ion from 'react-native-vector-icons/Ionicons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {colorPallete} from '../../components/atoms/colorPalette';

const slides = [
  {
    key: 1,
    title: 'Home',
    text: 'Description.\nSay something cool',
    image: require('../../assets/images/slide1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Report',
    text: 'Other cool stuff',
    image: require('../../assets/images/slide2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Add Medicine',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/images/slide3.jpg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Medicine',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/images/slide4.jpg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 5,
    title: 'Account',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/images/slide5.jpg'),
    backgroundColor: '#22bcb5',
  },
];

const IntroScreen = ({showIntro, setShowIntro}) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <View
          style={{
            backgroundColor: 'grey',
            height: '80%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={item.image}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  };

  const onDone = async () => {
    await AsyncStorage.setItem('intro', showIntro.toString());
    setShowIntro(false);
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <FontAwesomeIcon
          icon={faCheck}
          color={colorPallete.basicColor}
          size={20}
        />
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <FontAwesomeIcon
          icon={faArrowRight}
          color={colorPallete.basicColor}
          size={20}
        />
      </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          color={colorPallete.basicColor}
          size={20}
        />
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colorPallete.mainColor} />
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        style={{backgroundColor: colorPallete.mainColor, flex: 1}}
        showPrevButton={true}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: colorPallete.basicColor,
    marginVertical: 20,
    fontWeight: '700',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IntroScreen;
