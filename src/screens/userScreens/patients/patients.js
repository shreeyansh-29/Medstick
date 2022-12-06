/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import MyPatients from './myPatients';
import PatientRequest from './patientRequest';
import {View} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserFriends, faHospitalUser} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../styles/patientStyles/patientsStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {Iconcomp1, Iconcomp2} from '../careTaker/allIcons';

const Patients = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useFocusEffect(() => {
    async function checkforlog() {
      const checkforlogin = await AsyncStorage.getItem('user_id');

      if (checkforlogin === null) {
        Alert.alert(
          'Sign in first to use this feature',
          'Click ok to proceed',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('AuthScreen');
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                navigation.navigate('Account');
              },
            },
          ],
        );
      }
    }
    checkforlog();
  });

  return (
    <View style={{flex: 1}}>
      <SubHeader title={'My Patients'} navigation={navigation} />
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={styles.tabIndicator}
        style={styles.tab}
        variant="primary">
        <Tab.Item
          title="Patients"
          containerStyle={styles.tabItem}
          titleStyle={styles.tabTitle}
          icon={Iconcomp1}
        />
        <Tab.Item
          title="Patient Request"
          titleStyle={styles.tabTitle}
          containerStyle={styles.tabItem}
          icon={Iconcomp2}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabItems}>
          <MyPatients
            navigation={navigation}
            myPatients={myPatients}
            setMyPatients={setMyPatients}
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </TabView.Item>
        <TabView.Item style={styles.tabItems}>
          <PatientRequest
            patients={patients}
            setPatients={setPatients}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setPageNo={setPageNo}
            setMyPatients={setMyPatients}
          />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default Patients;
