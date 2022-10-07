import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import SubHeader from '../../components/molecules/headers/subHeader';
import {ListItem} from 'react-native-elements';
import {colorPalette} from '../../components/atoms/colorPalette';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const AppointmentReminders = ({navigation}) => {
  const appointment = [
    {name: 'Manish', symptom: 'fever', time: '01:30', status: 0},
    {name: 'Devanshu', symptom: 'depression', time: '12:00', status: 1},
    {name: 'shreeyansh', symptom: 'cold', time: '3:00', status: 1},
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <Card style={Styles.card}>
          <View style={Styles.listView}>
            <ListItem style={Styles.list}>
              <ListItem.Content>
                <View style={Styles.avatarView}>
                  <View style={Styles.medNameView}>
                    <ListItem.Title style={Styles.medName}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.symptom}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
                  </View>
                </View>
              </ListItem.Content>
            </ListItem>
          </View>
        </Card>
      </>
    );
  };

  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colorPalette.mainColor,
          height: '50%',
          width: '200%',
          borderBottomEndRadius: 530,
          borderBottomStartRadius: 590,
          top: -120,
          right: -120,
        }}
      />
      <View>
        <SubHeader title={'Appointment Reminders'} navigation={navigation} />
        
      </View>
      {appointment.length === 0 ? (
        <View style={Styles.lottie}>
          <LottieView
            style={Styles.lottieView}
            speed={0.8}
            source={require('../../assets/animation/noMedicine2.json')}
            progress={progress}
          />
        </View>
      ) : (
        <FlatList
          data={appointment}
          renderItem={renderItem}
          numColumns={1}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default AppointmentReminders;
