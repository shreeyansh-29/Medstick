import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import { colorPalette } from '../../components/atoms/colorPalette';

const Reminders = () => {
  const [medicine, setMedicine] = useState([]);

  const renderItem = ({item}) => {
    return <View></View>;
  };

  return (
    <>
      <View>
        <Text style={styles.reminder}>{'Reminders'}</Text>
      </View>
      <View style={{height: 400, backgroundColor: colorPalette.barColor}}>
        <Text style={{color: 'black'}}>reminders</Text>
        <FlatList data={medicine} renderItem={renderItem} numColumns={1} />
      </View>
    </>
  );
};

export default Reminders;
