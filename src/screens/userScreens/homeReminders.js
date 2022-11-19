import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
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
import MedicineHistory from './medicineHistory/medicineHistory';

const Reminders = ({showAlert}) => {
  const [medData, setMedData] = useState([]);
  const [reminderList, setReminderList]=useState([]);

  // MedicineHistory();
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
  };

  let reminderCard = {
    reminderTime: null,
    medName: null,
    userMedicineId: null,
    historyId: null,
  };

  function dailyReminders() {
    var tody_date = new Date();
    let td_da =
      tody_date.getDate() +
      '-' +
      (tody_date.getMonth() + 1) +
      '-' +
      tody_date.getFullYear();

    console.log('data', medData);
    medData.map(item => {
     let tempReminderList=[]
      let temp = reminder;
      temp.userMedicineId = item.userMedicineId;
      temp.medName = item.medicineName;
      item.historyList.map(r => {
        if (r.date === td_da) {
            temp.historyId = r.historyId;
            r.time.map(z => {
              let temp1=temp;
              temp1.time = z;
              console.log(temp1, 'zzz ****');
              tempReminderList.push(temp1);
            });
          }
        }
      );
      console.log(tempReminderList, 'zzz');
      setReminderList(tempReminderList);
    });
    // console.log(reminderList, 'Reminders');
  }

  function empty() {
    reminderList.length = 0;
  }
  // empty();
  // console.log(reminderList, ' <<<<<    after empty ');
  dailyReminders();

  function markingTaken(item) {
    console.log(item.item, ' INSIDE MARKING');
    console.log('before marking ', medData);
    const {userMedicineId, historyId, time, medName} = item.item;
    medData.map(item => {
      // console.log(item, 'zzz');
      if (
        item.userMedicineId == userMedicineId &&
        item.medicineName == medName
      ) {
        item.historyList.map(r => {
          if (r.historyId == historyId && !r.taken.includes(time)) {
            r.taken = r.taken + time + ',';
          }
        });
        // console.log('After updating reminders ', item);
      }
    });
    console.log('After updating reminders ', medData);
  }


  const renderItem = (item, index) => {
    console.log(item, 'aaa');
    const {medName, time}= item;
    return (
      <View style={{width: '100%'}} key={index}>
        <View style={styles.list} key={index+1}>
          <View style={styles.avatarView } key={index+2}>
            <View style={styles.medNameView} key={index+3}>
              <ListItem.Title key={index+4} style={styles.medName}>
                {item.time}
              </ListItem.Title>
              <ListItem.Subtitle key={index+5} style={{marginVertical: 2, fontSize: 16}}>
                {item.medName}
              </ListItem.Subtitle>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index+6}
            >
            <TouchableOpacity
            key={index+7}
              style={{padding: 8}}
              activeOpacity={1}
              onPress={() => {
                markingTaken(item);
                reminderList.splice(index, 1);
                console.log('deleting reminder ', reminderList);
              }}>
              <FontAwesomeIcon
              key={index+9}
                icon={faCircleCheck}
                color={colorPalette.mainColor}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity key={index+10} style={{padding: 8}} activeOpacity={1}>
              <FontAwesomeIcon
              key={index+11}
                icon={faCircleXmark}
                color={colorPalette.redPercentageColor}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
            <FlatList
              data={reminderList}
              renderItem={renderItem}
              keyExtractor={item => item.userMedicineId}
            />
          </View>
        )}
      </View>
    </>
  );
};
export default Reminders;
