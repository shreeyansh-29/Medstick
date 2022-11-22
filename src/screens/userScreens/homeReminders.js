import {View, Image, TouchableOpacity, ScrollView, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {getMedicine} from '../../utils/storage';


const Reminders = ({showAlert}) => {
  const [medData, setMedData] = useState([]);
  const [reminderList, setReminderList] = useState([]);

  useEffect(() => {
    getMedicine().then(data => {
      if (data !== null) setMedData(data);
    });
  }, []);

  let reminder = {
    userMedicineId: null,
    medName: null,
    historyId: null,
    time: null,
    taken: null,
    notTaken: null,
  };

  let reminderCard = {
    reminderTime: null,
    medName: null,
  };
  function dailyReminders() {
    medData.map(item => {
      let temp = reminder;
      temp.userMedicineId = item.userMedicineId;
      temp.medName = item.medicineName;
      item.historyList.map(r => {
        let a = b => b.historyId == r.historyId;
        let index = reminderList.findIndex(a);
        if (reminderList.some(a)) {
          reminderList[index].time = r.time;
        } else {
          temp.historyId = r.historyId;
          temp.time = r.time;
          reminderList.push(temp);
        }
      });
    });
    // console.log(reminderList, 'Reminders');
  }

  function marking() {}

  function empty() {
    reminderList.length = 0;
  }
  // empty();
  // console.log(reminderList, ' <<<<<    after empty ')
  dailyReminders();

  const renderItem = (item, index) => {
    console.log(item, ' Reminder Card');
    return (
      <Animatable.View
        animation="zoomInUp"
        duration={400}
        style={{width: '100%'}}
        key={index}>
        <View style={styles.list}>
          <View style={styles.avatarView}>
            <View style={styles.medNameView}>
              <ListItem.Title style={styles.medName}>
                {item.reminderTime}
              </ListItem.Title>
              <ListItem.Subtitle style={{marginVertical: 2, fontSize: 16}}>
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
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 8}} activeOpacity={1}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                color={colorPalette.redPercentageColor}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {reminderList.length === 0 ? (
          <ScrollView
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}>
            <View style={styles.imgContainer}>
              <Image
                resizeMode="contain"
                style={styles.img}
                source={require('../../assets/images/noremtoday.png')}
              />
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colorPalette.backgroundColor,
              borderRadius: 10,
              alignSelf: 'center',
            }}>
            <ScrollView
              width={'100%'}
              contentContainerStyle={{alignItems: 'center'}}
              showsVerticalScrollIndicator={false}>
              {reminderList.map((i, index) => {
                let obj = reminderCard;
                obj.medName = i.medName;
                obj.reminderTime = '7:30 PM';
                return renderItem(obj, index);
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
};
export default Reminders;
