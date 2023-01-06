import MyCareTaker from './myCareTaker';
import React, {useState, useEffect} from 'react';
import CareTakerRequest from './careTakerRequest';
import {View} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import {Caretaker_nurse, Userfriend} from './allIcons';
import {styles} from '../../../styles/careTakerStyles/careTakerStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPallete} from '../../../components/atoms/colorPalette';

const CareTaker = ({navigation}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPallete.basicColor,
          paddingHorizontal: 16,
        },
      });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <SubHeader title={'My Caretaker'} navigation={navigation} />
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={styles.tabIndicator}
        style={styles.tab}
        variant="primary">
        <Tab.Item
          title="Caretakers"
          containerStyle={styles.tabItemContainer}
          titleStyle={styles.tabItemTitle}
          icon={Caretaker_nurse()}
        />
        <Tab.Item
          title="Caretaker request"
          titleStyle={styles.tabItemTitle}
          containerStyle={styles.tabItemContainer}
          icon={Userfriend()}
        />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabItem}>
          <MyCareTaker navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.tabItem}>
          <CareTakerRequest />
        </TabView.Item>
      </TabView>
    </View>
  );
};

export default CareTaker;
