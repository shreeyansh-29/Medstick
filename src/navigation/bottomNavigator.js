import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/userScreens/homeScreen';
import Report from '../screens/userScreens/report';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Ripple from 'react-native-material-ripple';
import '../../ignoreWarnings';
import {
  faCapsules,
  faCircleUser,
  faFileContract,
  faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../components/atoms/colorPalette';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';
import AccountTab from '../screens/userScreens/accountTab';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
import AddButton from '../components/atoms/addButton';
import {styles} from '../styles/navigationStyles';

const TabBar = [
  {route: 'Home', component: HomeScreen, iconName: faHouseMedical},
  {route: 'Report', component: Report, iconName: faFileContract},
  {route: 'Add', component: AddMedicine},
  {route: 'Medicine', component: MedicinePanel, iconName: faCapsules},
  {route: 'Account', component: AccountTab, iconName: faCircleUser},
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
        style={styles.ripple}
        rippleCentered={true}
        rippleColor={colorPalette.colorTabs}
        rippleDuration={800}>
        <FontAwesomeIcon icon={item.iconName} size={size} color={colors} />
        {focused ? (
          <Text style={styles.focused}>{item.route}</Text>
        ) : (
          <Text style={styles.notFocused}>{item.route}</Text>
        )}
      </Ripple>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 58,
          backgroundColor: colorPalette.basicColor,
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
                  <View style={styles.addbtn}>
                    <AddButton
                      routeName={'AddMedicine'}
                      navigation={navigation}
                      styles={styles.btn}
                    />
                  </View>
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
