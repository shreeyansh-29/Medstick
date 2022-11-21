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
import {AddMedicine, getMedicine} from '../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
// import MedicineHistory from './medicineHistory/medicineHistory';

function MedicineHistory(medData) {
  let history = {
    historyId: null,
    date: null,
    taken: '',
    notTaken: '',
    time: null,
  };
  for (let i = 0; i < medData.length; i++) {
    let arr = medData[i].days.split(',');
    let set = new Set(arr);
    var start_date = new Date(medData[i].endDate);
    var end_date = new Date(medData[i].endDate);
    var tody_date = new Date();
    let td_da =
      tody_date.getFullYear() +
      '-' +
      (tody_date.getMonth() + 1) +
      '-' +
      tody_date.getDate();
    if (
      medData[i].endDate !== 'No End Date' &&
      set.has(weeks[tody_date.getDay()]) &&
      start_date <= tody_date <= end_date
    ) {
      const a = b => b.date == td_da;
      const index = medData[i].historyList.findIndex(a);
      if (medData[i].historyList.length === 0) {
        history.historyId = uuid.v4();
        history.date = td_da;
        history.time = medData[i].reminderTime.split(',');
        medData[i].historyList.push(history);
      } else if (medData[i].historyList.length !== 0 && index >= 0) {
        let obj = medData[i].historyList[index];
        obj.time = medData[i].reminderTime.split(',');
        // console.log(obj, 'existing reminder');
        medData[i].historyList[index] = obj;
      }
    } else if (medData[i].endDate === 'No End Date') {
      // console.log('<<<<<<<<< ====== Inside NO END DATE ====== >>>>>>>>');
      const a = b => b.date == td_da;
      const index = medData[i].historyList.findIndex(a);
      if (medData[i].historyList.length === 0) {
        history.historyId = uuid.v4();
        history.date = td_da;
        history.time = medData[i].reminderTime.split(',');
        medData[i].historyList.push(history);
      } else if (medData[i].historyList.length !== 0 && index >= 0) {
        let obj = medData[i].historyList[index];
        obj.time = medData[i].reminderTime.split(',');
        // console.log(obj, 'existing reminder');
        medData[i].historyList[index] = obj;
      }
    }

    console.log('<================ FINAL DATA ================>', medData);
    AddMedicine(medData);
  }
}

const Reminders = ({showAlert}) => {
  const [medData, setMedData] = useState([]);
  const [reminderList, setReminderList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getMedicine().then(data => {
      if (data !== null) {
        setMedData(data);
      }
    });
  }, [medData]);

  useEffect(() => {
    if (isFocused) MedicineHistory(medData);
  }, [medData]);

  useEffect(() => {
    if (isFocused) settingReminders();
  }, []);

  let tempReminderList = [];

  function dailyReminders() {
    var tody_date = new Date();
    let td_da =
      tody_date.getFullYear() +
      '-' +
      (tody_date.getMonth() + 1) +
      '-' +
      tody_date.getDate();

    // console.log('data', medData);
    medData.map(item => {
      item.historyList.map(r => {
        if (r.date === td_da) {
          r.time.map(z => {
            console.log('time', z);
            let temp = {};
            temp.userMedicineId = item.userMedicineId;
            temp.medName = item.medicineName;
            temp.historyId = r.historyId;
            temp.time = z;
            console.log('zzz ****', tempReminderList.length);
            tempReminderList.push(temp);
            item.totalReminders += 1;

            console.log('zzz ****', tempReminderList.length);
          });
        }
      });
    });
    return tempReminderList;
  }

  // function empty() {
  //   reminderList.length = 0;
  // }
  // empty();
  // console.log(reminderList.length, ' <<<<<    after empty ');
  function settingReminders() {
    let abc = dailyReminders();
    if (abc.length !== null) {
      setReminderList(abc);
    }
  }

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
            item.currentCount += 1;
          }
        });
        // console.log('After updating reminders ', item);
      }
    });
    console.log('After updating reminders ', medData);
    AddMedicine(medData);
  }

  const renderItem = (item, index) => {
    // console.log(item.item.medName, 'aaa');
    const {medName, time} = item.item;
    return (
      <View style={{width: '100%'}} key={index}>
        <View style={styles.list} key={index + 1}>
          <View style={styles.avatarView} key={index + 2}>
            <View style={styles.medNameView} key={index + 3}>
              <ListItem.Title key={index + 4} style={styles.medName}>
                {time}
              </ListItem.Title>
              <ListItem.Subtitle
                key={index + 5}
                style={{marginVertical: 2, fontSize: 16}}>
                {medName}
              </ListItem.Subtitle>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index + 6}>
            <TouchableOpacity
              key={index + 7}
              style={{padding: 8}}
              activeOpacity={1}
              onPress={() => {
                markingTaken(item);
                reminderList.splice(index, 1);
                console.log('deleting reminder ', reminderList);
              }}>
              <FontAwesomeIcon
                key={index + 9}
                icon={faCircleCheck}
                color={colorPalette.mainColor}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              key={index + 10}
              style={{padding: 8}}
              activeOpacity={1}>
              <FontAwesomeIcon
                key={index + 11}
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
