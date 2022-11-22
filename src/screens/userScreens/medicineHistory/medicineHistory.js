import {AddMedicine, getMedicine} from '../../../utils/storage';
import uuid from 'react-native-uuid';
import {useState, useEffect} from 'react';

var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

function MedicineHistory() {
  const [medData, setMedData] = useState([]);

  useEffect(() => {
    getMedicine().then(data => {
      setMedData(data);
    });
  }, []);

  // console.log(medData, ' medicine Data  ');
  let history = {
    historyId: null,
    date: null,
    taken: null,
    notTaken: null,
    time: null,
  };
  for (let i = 0; i < medData.length; i++) {
    let arr = medData[i].days.split(',');
    let set = new Set(arr);
    var start_date = new Date(medData[i].endDate);
    var end_date = new Date(medData[i].endDate);
    var tody_date = new Date();
    let td_da =
      tody_date.getDate() +
      '-' +
      (tody_date.getMonth() + 1) +
      '-' +
      tody_date.getFullYear();

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

    // console.log('<================ FINAL DATA ================>', medData);
    AddMedicine(medData);
  }
}

export default MedicineHistory;
