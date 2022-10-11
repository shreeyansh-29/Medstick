import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colorPalette } from '../atoms/colorPalette';

export default function ({ onPress, title, fill = false }) {
  return (
    <TouchableOpacity
      style={[styles.container, fill ? styles.fillContainer : styles.normalContainer]}
      onPress={onPress}
      underlayColor='#fff'>
      <Text
        style={[styles.buttonText, fill ? styles.fillText : styles.normalText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 2,
    borderColor: colorPalette.BLUE,
    borderRadius: 25
  },
  fillContainer: {
    backgroundColor: colorPalette.BLUE,
  },
  normalContainer: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: 'bold'
  },
  fillText: {
    color: 'white',
  },
  normalText: {
    color: colorPalette.BLUE
  }
});

