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
  faGear,
  faHouseMedical,
} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../components/atoms/colorPalette';
import AddMedicine from '../screens/userScreens/medicines/addMedicine';
import AccountTab from '../screens/userScreens/accountTab';
import MedicinePanel from '../screens/userScreens/medicines/medicinePanel';
import AddButton from '../components/atoms/addButton';

const TabBar = [
  {route: 'Home', component: HomeScreen, iconName: faHouseMedical},
  {route: 'Report', component: Report, iconName: faFileContract},
  {route: 'Add', component: AddMedicine, iconName: faGear},
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
                  <View style={{marginBottom: 57}}>
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

const styles = StyleSheet.create({
  btn: {height: 84, width: 84},
});
