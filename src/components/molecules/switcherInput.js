import React from 'react';
import {View, Switch, Text, StyleSheet} from 'react-native';
import { colorPalette } from '../atoms/colorPalette';

export default function ({value, onChange, description}) {

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Switch
          ios_backgroundColor={'black'}
          trackColor={{ false: colorPalette.GREY, true: colorPalette.BLUE, }}
          value={value}
          onValueChange={value => onChange(value)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  descriptionText: {
    fontWeight: 'bold',
    color: colorPalette.BLUE
  }
});