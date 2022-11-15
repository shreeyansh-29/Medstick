import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './homeReminders';
import {Styles} from '../../styles/homeScreenStyles/performanceCircleStyles';
import {styles} from '../../styles/homeScreenStyles/homeScreenStyles';
import CustomModal from '../../components/molecules/customModal';
import {Divider} from 'react-native-elements';

const HomeScreen = ({navigation}) => {
  
  const showAlert = () => {
    Alert.alert(
      'Would you like to send a snap to caretaker',
      'Click Ok to send',
      [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('HomeStack', {screen: 'SendSnap'});
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            {
            }
          },
        },
      ],
    );
  };

  return (
    <>
      <View style={styles.background} />
      <View style={styles.container}>
        <MainHeader title={'Medstick'} navigation={navigation} />
        {/* <CustomModal
          modalVisible={visible}
          type="fade"
          customStyles={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          }}
          onRequestClose={() => setVisible(false)}
          modalView={
            <View
              style={{
                backgroundColor: 'white',
                height: '20%',
                width: '56%',
                borderRadius: 12,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Would you like to send snap to cartaker
                </Text>
              </View>

              <Divider style={{width: '100%', height: 1}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 4,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('HomeStack', {screen: 'SendSnap'})
                  }>
                  <Text style={{fontSize: 16}}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}>
                  <Text style={{fontSize: 16}}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        /> */}
        <View style={styles.card}>
          <Calender />
          <PerformanceCircle
            styles={Styles}
            radius={42}
            borderWidth={6}
            percent={30}
            text="Today's Performance"
          />
        </View>
        <Reminders showAlert={showAlert} />
      </View>
    </>
  );
};

export default HomeScreen;
