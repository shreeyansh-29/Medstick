import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {verticalScale, horizontalScale} from '../../components/atoms/constant';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsisVertical,
  faPills,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../../components/atoms/colorPalette';

const Reminders = () => {
  const [visible, setVisible] = useState(false);
  const [reminders, setReminders] = useState([
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
      before: 'After',
    },
    {
      endDate: '2022-09-30',
      days: 'Monday,Tuesday,Friday',
      reminderTitle: 'Take after eating something',
      reminderTime: '10:00AM, 8:00PM',
      frequency: 'Breakfast',
    },
  ]);

  const renderItem = ({item}) => {
    return (
      <Animatable.View animation="zoomInUp" duration={400}>
        <Card style={styles.card}>
          <View style={styles.listView}>
            <ListItem style={styles.list}>
              <ListItem.Content>
                <View style={styles.avatarView}>
                  <View style={styles.medNameView}>
                    <ListItem.Title style={styles.medName}>
                      {item.reminderTime}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.reminderTitle}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.days}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.frequency}</ListItem.Subtitle>
                  </View>
                </View>
              </ListItem.Content>

              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}>
                <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  color={colorPalette.mainColor}
                  size={24}
                />
              </TouchableOpacity>
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
    // <View style={styles.card}>
    //   <Text style={styles.font}>Reminders</Text>
    //   {/* </View> */}
    //   <View style={{height: 309, width: '100%'}}>
    //     {reminders.length === 0 ? (
    //       <View style={styles.container}>
    //         <Image
    //           resizeMode="contain"
    //           style={styles.img}
    //           source={require('../../assets/images/noremtoday.png')}
    //         />
    //       </View>
    //     ) : (
    //       <View style={styles.flatList}>
    //         <ReminderList />
    //       </View>
    //     )}
    //   </View>
    // </View>
  );
};

export default Reminders;
