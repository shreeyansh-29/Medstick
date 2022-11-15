import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

const Reminders = ({setVisible}) => {
  const [reminders, setReminders] = useState([
    {
      medName: 'Acetaminophen',
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM',
      frequency: 'Breakfast',
      before: 'After',
      medName: 'Azithromycin',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM',
      frequency: 'Breakfast',
      before: 'After',
      medName: 'Dalcoflex',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM',
      frequency: 'Breakfast',
      before: 'After',
      medName: 'Benzhydrocodone',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM',
      frequency: 'Breakfast',
      before: 'After',
      medName: 'Acetaminophen',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM',
      frequency: 'Breakfast',
      before: 'After',
      medName: 'Diflorasone Diacetate',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <Animatable.View animation="zoomInUp" duration={400}>
        <Card style={styles.card}>
          <View style={styles.listView}>
            <ListItem style={styles.list}>
              <ListItem.Content
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.avatarView}>
                  <View style={styles.medNameView}>
                    <ListItem.Title style={styles.medName}>
                      {item.reminderTime}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{marginVertical: 2, fontSize: 16}}>
                      {item.medName}
                    </ListItem.Subtitle>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{padding: 8}}
                    activeOpacity={1}
                    onPress={() => setVisible(true)}>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      color={colorPalette.mainColor}
                      size={24}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding: 8}} activeOpacity={1}>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      color={colorPalette.redPercentageColor}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              </ListItem.Content>
            </ListItem>
          </View>
        </Card>
      </Animatable.View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.font}>Reminders</Text>
      </View>
      {reminders.length === 0 ? (
        <View style={styles.imgContainer}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../assets/images/noremtoday.png')}
          />
        </View>
      ) : (
        <View style={styles.flatList}>
          <FlatList
            data={reminders}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

export default Reminders;
