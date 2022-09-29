import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';
import {styles} from '../../styles/addRemainderStyles';
import alarmView from '../../components/organisms/alarm/alarmView';
import {
  enableAlarm,
  disableAlarm,
  getAlarmState,
  getAllAlarms,
} from '../../components/organisms/alarm/alarmService';
import TimePicker from '../../components/molecules/timePicker';
import {colorPalette} from '../../components/atoms/colorPalette';

const AddRemainder = props => {
  const [pill, setPill] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorName, setDoctorName] = useState('');
  const [medicineAmount, setMedicineAmount] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [alarms, setAlarms] = useState(null);
  const [scheduler, setScheduler] = useState(null);
  const [alarm, setAlarm] = useState(null);

  useEffect(() => {
    props.navigation.addListener('focus', async () => {
      setAlarms(await getAllAlarms());
      setScheduler(setInterval(fetchState, 10000));
    });
    props.navigation.addListener('blur', async () => {
      clearInterval(scheduler);
    });
    fetchState();
  }, []);

  async function fetchState() {
    const alarmUid = await getAlarmState();
    if (alarmUid) {
      props.navigation.navigate('Ring', {alarmUid});
    }
  }

  const showDateTimePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDateTimePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDatePicker = datetime => {
    var currentTime = Date.now();
    if (datetime.getTime() < currentTime) {
      Alert.alert('Please choose future time');
      hideDateTimePicker();
      return;
    }
    hideDateTimePicker();
  };

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const exitCard = () => {
    props.navigation.goBack();
  };

  return (
    // <ScrollView>
    <>
      <View
        style={{
          flex: 1,
          // padding: 20
        }}>
        {/* <TouchableOpacity onPress={()=>exitCard()}>
          <Icon name="arrowleft" color="#fff" size={28} />
        </TouchableOpacity> */}
        <Text style={styles.title}>Add Remainder</Text>
        <View style={{left: 30, borderRadius: 20}}>
          <TextInput
            id="Doctor's Name"
            style={{width: '82%'}}
            label="Medicine Name"
            value={doctorName}
            mode="outlined"
            onChangeText={text => setDoctorName(text)}
            outlineColor="#02ABA6"
            activeOutlineColor="#02ABA6"
          />
        </View>
        <View style={{flexDirection: 'row', paddingTop: 20}}>
          {/* <TextInput style={{fontSize: 17}} placeholder="Medicine Amount" /> */}
          <TextInput
            id="Doctor's Name"
            style={styles.textInput}
            label="Medicine Amount"
            value={medicineAmount}
            mode="outlined"
            onChangeText={text => setMedicineAmount(text)}
            outlineColor="#02ABA6"
            activeOutlineColor="#02ABA6"
          />
          <Picker
            id="picker1"
            placeholder="Select Medicine Type"
            style={styles.picker}
            selectedValue={pill}
            onValueChange={value => setPill(value)}>
            <Picker.Item label="Tablet" value="tablet" />
            <Picker.Item label="Inhaler" value="inhaler" />
            <Picker.Item label="Injection" value="injection" />
            <Picker.Item label="Syrup" value="syrup" />
          </Picker>
        </View>
        <View style={{margin: 15, padding: 15}}>
          <Text>______________________________________________</Text>
        </View>
        <View>
          <View style={{marginLeft: 25}}>
            <Text style={{fontSize: 30}}>09:26</Text>
        
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('edit');
          }}
          style={{position: 'absolute', bottom: 10, marginLeft: '41%'}}>
          <LottieView
            style={styles.lottie}
            speed={0.7}
            autoPlay
            loop
            source={require('../../assets/animation/addButton.json')}
            progress={progress}
          />
        </TouchableOpacity>

        <DatePicker
          modal
          mode="time"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </>
    // </ScrollView>
  );
};

export default AddRemainder;
