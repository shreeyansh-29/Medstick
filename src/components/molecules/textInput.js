import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { colorPalette } from '../atoms/colorPalette';

export default function CustomTextInput ({onChangeText, value, description}) {

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: colorPalette.GREY,
    fontWeight: 'bold'
  },
  descriptionContainer: {
    margin: 10,
    marginLeft: 0
  },
  descriptionText: {
    fontWeight: 'bold',
    color: colorPalette.BLUE
  }
});