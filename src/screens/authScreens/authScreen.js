import {View, Text} from 'react-native';
import React from 'react';
import SignUp from './signUp';
import Login from './login';
import Divider from '../../components/atoms/divider';
import {horizontalScale, verticalScale} from '../../components/atoms/constant';
import {colorPalette} from '../../components/atoms/colorPalette';
import SubHeader from '../../components/molecules/headers/subHeader';
import Toast from 'react-native-toast-message';

const AuthScreen = ({navigation, route}) => {
  return (
    <View style={{flex: 1}}>
      <SubHeader navigation={navigation} />
      <Toast visibilityTime={3000} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        {/* <View
          style={{
            width: '80%',
            alignItems: 'center',
            elevation: 1,
            paddingVertical: 50,
          }}> */}
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
            }}>
            Sign in / Sign up
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
              paddingTop: 12,
            }}>
            Sign up to access the app!
          </Text>
        </View>

        <SignUp navigation={navigation} />
        {/* </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 24,
          }}>
          <View
            style={{
              height: 1.2,
              backgroundColor: 'grey',
              width: '36.5%',
            }}
          />

          <View>
            <Text style={{width: 30, textAlign: 'center', color: 'grey'}}>
              OR
            </Text>
          </View>
          <View
            style={{
              height: 1.2,
              backgroundColor: 'grey',
              width: '36.5%',
            }}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'grey',
              fontSize: 16,
            }}>
            Already have an account!
          </Text>
        </View>
        <Login navigation={navigation} text={route.params?.text} />
      </View>
    </View>
  );
};

export default AuthScreen;
