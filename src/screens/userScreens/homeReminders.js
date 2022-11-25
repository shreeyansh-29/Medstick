import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {AddMedicine, getMedicine} from '../../utils/storage';
import {useIsFocused} from '@react-navigation/native';

const Reminders = ({showAlert, setPercentage}) => {
  const [medData, setMedData] = useState([]);
  const [reminderList, setReminderList] = useState([]);
  const isFocused = useIsFocused();
  const [totalReminders, setTotalReminders] = useState(0);
  let currentCount = 0;
  useEffect(() => {
    if (isFocused) {
      getMedicine().then(data => {
        if (data !== null) {
          setMedData(data);
        }
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) settingReminders();

    let t = false;
    return () => {
      t = true;
    };
  }, [isFocused, medData]);

  let tempReminderList = [];

  function dailyReminders(medicine) {
    var tody_date = new Date();
    let td_da =
      tody_date.getFullYear() +
      '-' +
      (tody_date.getMonth() + 1) +
      '-' +
      tody_date.getDate();

    medicine.map(item => {
      item.historyList.map(r => {
        if (r.date === td_da) {
          r.time.map(z => {
            if (!r.taken.includes(z)) {
              let temp = {};
              temp.userMedicineId = item.userMedicineId;
              temp.medName = item.medicineName;
              temp.historyId = r.historyId;
              temp.time = z;
              tempReminderList.push(temp);
              item.totalReminders += 1;
            }
          });
        }
      });
    });
    return tempReminderList;
  }

  // console.log(reminderList.length, ' <<<<<    after empty ');
  function settingReminders() {
    let abc = dailyReminders(medData);
    if (abc.length !== 0) {
      console.log(abc.length);
      setTotalReminders(abc.length);
      setReminderList(abc);
    }
  }

  function markingTaken(item) {
    console.log(item.item, ' INSIDE MARKING');
    console.log('before marking ', medData);

    const {userMedicineId, historyId, time, medName} = item.item;
    let arr = medData.forEach(item => {
      if (
        item.userMedicineId == userMedicineId &&
        item.medicineName == medName
      ) {
        item.historyList.map(r => {
          if (r.historyId == historyId && !r.taken.includes(time)) {
            // console.log('abcd',r.notTaken);
            r.taken = r.taken + time + ',';
            let arr = r.notTaken.split(',');
            // console.log(' arr', arr);
            // console.log(arr.indexOf(time));
            arr.splice(arr.indexOf(time), 1);

            r.notTaken = arr.toString();
            // console.log(r, 'after updating notTaken');
            item.currentCount += 1;
          }
        });
        // console.log('After updating reminders ', item);
        return item;
      }
    });
    currentCount += 1;
    let percentage = Math.floor((currentCount / totalReminders) * 100);
    console.log('percentage', currentCount);
    setPercentage(percentage);

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
                setReminderList(reminderList);
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
              onPress={() => {
                reminderList.splice(index, 1);
                setReminderList(reminderList);
              }}
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
              showsVerticalScrollIndicator={false}
              data={reminderList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </>
  );
};
export default Reminders;
