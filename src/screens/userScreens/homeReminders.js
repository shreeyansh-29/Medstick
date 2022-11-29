import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import {
  AddMedicine,
  getPercentageDetails,
} from '../../utils/storage';

const Reminders = ({showAlert, setPercentage, data}) => {
  const medData = data;
  const [reminderList, setReminderList] = useState([]);
  
  var tody_date = new Date();
  let td_da =
    tody_date.getFullYear() +
    '-' +
    (tody_date.getMonth() + 1) +
    '-' +
    tody_date.getDate();

  let tempList = new Set();

  useEffect(() => {
    if (medData != null) {
      display();
    }
    return () => {};
  }, [medData]);

  function display() {
    getPercentageDetails()
      .then(data => {
        if (data != null && data.date != '') {
          let p = getPercentage(medData);
          setPercentage(p);
        }
      })
      .then(() => {
        if (medData.length != 0) {
          dailyReminders(medData);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }

  function totalMedReminders(data, index) {
    let totalMedReminder = 0;
    data[index].historyList.map(h => {
      h.time.map(t => {
        totalMedReminder += 1;
      });
    });
    return totalMedReminder;
  }
  function dailyReminders(medicine) {
    medicine.map((item, index) => {
      item.totalReminders = totalMedReminders(medicine, index);
      item.historyList.map(r => {
        if (r.date === td_da) {
          r.notTaken.split(',').map(z => {
            const a = b => b.historyId == r.historyId;
            const index = reminderList.findIndex(a);
            if (!r.taken.includes(z)) {
              let temp = {};
              temp.userMedicineId = item.userMedicineId;
              temp.medName = item.medicineName;
              temp.historyId = r.historyId;
              temp.time = z;
              tempList.add(temp);
              setReminderList([...tempList]);
            }
          });
        }
      });
    });
  }

  function getPercentage(data) {
    let tr = 0;
    let cc = 0;
    data.map(item => {
      item.historyList.map(k => {
        if (k.date == td_da) {
          tr += item.reminderTime.split(',').length;
          let temp = k.taken.split(',');
          temp.map(i => {
            if (i !== '') {
              cc += 1;
            }
          });
        }
      });
    });
    return Math.floor((cc / tr) * 100);
  }

  function markingTaken(item) {
    const {userMedicineId, historyId, time, medName} = item.item;
    medData.forEach(item => {
      if (
        item.userMedicineId == userMedicineId &&
        item.medicineName == medName
      ) {
        item.historyList.map(r => {
          console.log(r, historyId);
          if (r.historyId === historyId && !r.taken.includes(time)) {
            r.taken = r.taken + time + ',';
            let arr = r.notTaken.split(',');
            arr.splice(arr.indexOf(time), 1);
            r.notTaken = arr.toString();
            item.currentCount += 1;
            item.stock -= 1;
          }
        });
        console.log('After updating reminders ', item);
      }
    });
    let percent = getPercentage(medData);
    setPercentage(percent);
    AddMedicine(medData);
  }

  const renderItem = (item, index) => {
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
                showAlert();
                markingTaken(item);
                reminderList.splice(index, 1);
                setReminderList(reminderList);
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
