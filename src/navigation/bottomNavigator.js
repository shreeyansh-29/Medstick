import React from 'react';
import {Animated, Dimensions, TouchableOpacity, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/userScreens/homeScreen';
import Report from '../screens/userScreens/report';
import Profile from '../screens/userScreens/userProfile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import '../../ignoreWarnings';
import {
  faBriefcaseMedical,
  faCapsules,
  faCircleUser,
  faFileContract,
  faGear,
  faHouseMedical,
  faTablet,
} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../components/atoms/colorPalette';
import Medicine from '../screens/userScreens/medicines/medicine';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';

const TabBar = [
  {route: 'Home', component: HomeScreen, iconName: faHouseMedical},
  {route: 'Report', component: Report, iconName: faFileContract},
  {route: 'Add', component: AddMedicine, iconName: faGear},
  {route: 'Medicine', component: Medicine, iconName: faCapsules},
  {route: 'Profile', component: Profile, iconName: faCircleUser},
];
const Tab = createBottomTabNavigator();

const BottomNavigator = ({navigation}) => {
  const TabBarButton = props => {
    const {onPress, accessibilityState, item} = props;
    const focused = accessibilityState.selected;
    size = 26;
    fontSize = 12;
    colors = focused ? colorPalette.colorTabs : colorPalette.colorTabsOutline;
    return (
      <Ripple
        onPress={onPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          // padding: 15,
          flexDirection: 'column',
        }}
        rippleCentered={true}
        rippleColor={colorPalette.colorTabs}
        rippleDuration={800}>
        <FontAwesomeIcon icon={item.iconName} size={size} color={colors} />
        <Text
          style={{
            fontSize: 11,
            marginTop: 4,
            color: focused ? 'black' : 'grey',
            fontWeight: focused ? '500' : '300',
          }}>
          {item.route}
        </Text>
      </Ripple>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 58,
          backgroundColor: 'white',
          paddingHorizontal: 16,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
      backBehavior={'none'}>
      {TabBar.map((item, index) => {
        if (item.route === 'Add') {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarIcon: () => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddMedicine');
                    }}>
                    <View style={{bottom: 28}}>
                      <LottieView
                        style={{height: 84, width: 84}}
                        speed={0.6}
                        source={require('../assets/animation/addButton.json')}
                        autoPlay
                        loop
                      />
                    </View>
                  </TouchableOpacity>
                ),
              }}
            />
          );
        }
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: props => <TabBarButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomNavigator;
