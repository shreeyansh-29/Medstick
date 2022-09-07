/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import MyPatients from './myPatients';
import PatientRequest from './patientRequest';
import {View} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserFriends, faHospitalUser} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../styles/patientStyles/myPatientsStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';

const Patients = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const Iconcomp1 = () => {
    return (
      <FontAwesomeIcon
        style={styles.icon}
        color={colorPalette.mainColor}
        icon={faHospitalUser}
      />
    );
  };

  const Iconcomp2 = () => {
    return (
      <FontAwesomeIcon
        style={styles.icon}
        color={colorPalette.mainColor}
        icon={faUserFriends}
      />
    );
  };

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
          <MyPatients navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.tabItems}>
          <PatientRequest />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default Patients;
