import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../styles/homeScreenStyles/reminderStyles';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../components/atoms/colorPalette';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';

const Reminders = ({showAlert}) => {
  const [reminders, setReminders] = useState([
    {
      medName: 'Acetaminophen',
      reminderTime: '10:00AM',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Azithromycin',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Dalcoflex',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Benzhydrocodone',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Acetaminophen',
    },
    {
      reminderTime: '10:00AM',
      medName: 'Diflorasone Diacetate',
    },
  ]);

  const renderItem = (item, index) => {
    return (
      <Animatable.View
        animation="zoomInUp"
        duration={400}
        style={{width: '100%'}}
        key={index}>
        <View style={styles.list}>
          <View style={styles.avatarView}>
            <View style={styles.medNameView}>
              <ListItem.Title style={styles.medName}>
                {item.reminderTime}
              </ListItem.Title>
              <ListItem.Subtitle style={{marginVertical: 2, fontSize: 16}}>
                {item.medName}
              </ListItem.Subtitle>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{padding: 8}}
              activeOpacity={1}
              onPress={() => showAlert()}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={colorPalette.mainColor}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{padding: 8}} activeOpacity={1}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                color={colorPalette.redPercentageColor}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {reminders.length === 0 ? (
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              style={styles.img}
              source={require('../../assets/images/noremtoday.png')}
            />
          </View>
        ) : (
          // <FlatList
          //   data={reminders}
          //   renderItem={renderItem}
          //   numColumns={1}
          //   showsVerticalScrollIndicator={false}
          // />
          <View style={{width:'100%', height:'100%' , backgroundColor:colorPalette.backgroundColor, borderRadius:10, alignSelf:'center'}}>
          <ScrollView
            width={'100%'}
            contentContainerStyle={{alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            {reminders.map((i,index)=> {
              return renderItem(i, index);
            })}
          </ScrollView>
          </View>
        )}
      </View>
    </>
  );
};

export default Reminders;
