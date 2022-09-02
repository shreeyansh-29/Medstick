import React, {useRef} from 'react';
import {Animated, Dimensions, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/userScreens/homeScreen';
import Report from '../screens/userScreens/report';
import Profile from '../screens/userScreens/userProfile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LottieView from 'lottie-react-native';
import '../../ignoreWarnings';
import {
  faBriefcaseMedical,
  faFileContract,
  faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../components/atoms/colorPalette';
import Medicine from '../screens/userScreens/medicines/medicine';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';

const Tab = createBottomTabNavigator();

const BottomNavigator = ({navigation}) => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            right: 20,
            height: 60,
            bottom: 15,
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            elevation: 5,
            backgroundColor: 'white',
            paddingBottom: 10,
            paddingHorizontal: 30,
            paddingTop: 10,
            left: 20,
            borderRadius: 10,
          },
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Home"
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#3743AB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              (size = focused ? 25 : 20),
              (color = focused
                ? colorPalette.colorTabs
                : colorPalette.colorTabsOutline),
              (
                <FontAwesomeIcon
                  icon={faHouseMedical}
                  size={size}
                  color={color}
                />
              )
            ),
          }}
        />
        <Tab.Screen
          name="Report"
          component={Report}
          options={{
            headerStyle: {
              backgroundColor: '#3743AB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              (size = focused ? 25 : 20),
              (color = focused
                ? colorPalette.colorTabs
                : colorPalette.colorTabsOutline),
              (
                <FontAwesomeIcon
                  icon={faFileContract}
                  size={size}
                  color={color}
                />
              )
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Add"
          component={AddMedicine}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#3743AB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              (size = focused ? 25 : 20),
              (color = focused
                ? colorPalette.colorTabs
                : colorPalette.colorTabsOutline),
              (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddMedicine');
                  }}>
                  <View style={{bottom: 30}}>
                    <LottieView
                      style={{height: 78, width: 78}}
                      speed={0.6}
                      source={require('../assets/animation/addButton.json')}
                      autoPlay
                      loop
                    />
                  </View>
                </TouchableOpacity>
              )
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tab.Screen
          name="Medicine"
          component={Medicine}
          options={{
            headerStyle: {
              backgroundColor: '#3743AB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              (size = focused ? 25 : 20),
              (color = focused
                ? colorPalette.colorTabs
                : colorPalette.colorTabsOutline),
              (
                <FontAwesomeIcon
                  icon={faBriefcaseMedical}
                  size={size}
                  color={color}
                />
              )
            ),
            headerLeft: () => {
              <Button title="back" />;
            },
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: '#3743AB',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
            tabBarIcon: ({focused, size, color}) => (
              (size = focused ? 25 : 20),
              (color = focused
                ? colorPalette.colorTabs
                : colorPalette.colorTabsOutline),
              (<FontAwesome name="user-circle-o" size={size} color={color} />)
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>
      </Tab.Navigator>
      <Animated.View
        style={{
          height: 3,
          width: getWidth() - 10,
          backgroundColor: colorPalette.colorTabs,
          position: 'absolute',
          bottom: 72,
          left: 55,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </>
  );
};

function getWidth() {
  let width = Dimensions.get('window').width;
  width = width - 100;
  return width / 5;
}

export default BottomNavigator;
