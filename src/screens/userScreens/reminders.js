import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';

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
      <View style={{height: 400}}>
        <Text style={{color: 'black'}}>reminders</Text>
        <FlatList data={medicine} renderItem={renderItem} numColumns={1} />
      </View>
    </>
  );
};

export default Reminders;
