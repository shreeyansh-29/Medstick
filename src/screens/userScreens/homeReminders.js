import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

const Reminders = ({showAlert}) => {
  const [reminders, setReminders] = useState([
    {
      medName: 'Acetaminophen',
      reminderTime: '10:00AM',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Azithromycin',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Dalcoflex',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Benzhydrocodone',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Acetaminophen',
    },
    {
      reminderTime: '10:00AM',
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
                    onPress={() => showAlert()}>
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
