import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {Card, Title, Paragraph} from 'react-native-paper';
import {colorPalette} from '../../components/atoms/colorPalette';


const Reminders = () => {
  return (
    <View style={{flex: 1}}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.reminder}>{'Reminders'}</Text>
        </View>
      </Card>
      <View
        style={{
          backgroundColor: colorPalette.basicColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{height: 280, width: 192}}
          source={require('../../assets/images/noremtoday.png')}
        />
      </View>
    </View>
  );
};

export default Reminders;
