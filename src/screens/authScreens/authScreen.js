import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SignUp from './signUp';
import Login from './login';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Divider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colorPalette } from '../../components/atoms/colorPalette';


const AuthScreen = ({navigation}) => {
  const [connected, setConnected] = useState(false);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);

      if (!state.isConnected) {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 4000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      GoogleSignin.configure({
        webClientId:
          '380266789888-bupnp07eamd8bo5aoacs6vv7fv4mhkah.apps.googleusercontent.com',
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skipBtn}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.text}>Skip</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backBtn}
        activeOpacity={1}
        onPress={() => {
          navigation.pop();
        }}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} color={'gray'} />
      </TouchableOpacity>
      <View style={styles.mainView}>
        <View style={styles.textContainer}>
          <Text style={styles.signUpText}>Sign in / Sign up</Text>
          <Text style={styles.content}>Sign up to access the app!</Text>
        </View>

        <SignUp navigation={navigation} connected={connected} />

        <View style={styles.dividerCont}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>Or</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.loginView}>
          <Text style={styles.loginText}>Already have an account!</Text>
        </View>
        <Login navigation={navigation} connected={connected} />
      </View>
      <Toast visibilityTime={1000} />
      {visible && (
        <View style={styles.online}>
          <View style={styles.onlineCont}>
            <MaterialIcons name={'wifi'} color={'white'} size={20} />
            <Text style={styles.onlineText}>Back Online</Text>
          </View>
        </View>
      )}
      {!connected && (
        <View style={styles.offline}>
          <View style={styles.offlineCont}>
            <MaterialIcons name={'wifi-off'} color={'white'} size={20} />
            <Text style={styles.offlineText}>No Internet</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textContainer: {alignItems: 'center'},
  signUpText: {
    color: 'black',
    fontSize: 22,
  },
  content: {
    color: 'grey',
    fontSize: 16,
    paddingTop: 12,
  },
  loginView: {alignItems: 'center'},
  loginText: {
    color: 'grey',
    fontSize: 16,
  },
  dividerCont: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    color: 'grey',
    width: '6%',
  },
  dividerText: {
    paddingHorizontal: 6,
    marginVertical: 6,
    color: 'black',
  },
  skipBtn: {position: 'absolute', right: 16, top: 10},
  text: {color: 'gray', fontSize: 18},
  backBtn: {position: 'absolute', left: 16, top: 10},
  online: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colorPalette.greenPercentageColor,
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
  onlineCont: {
    flexDirection: 'row',
    width: '28%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onlineText: {color: 'white', fontSize: 16},
  offline: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'grey',
    height: 22,
    width: '100%',
    alignItems: 'center',
  },
  offlineCont: {
    flexDirection: 'row',
    width: '28%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  offlineText: {color: 'white', fontSize: 16},
});

export default AuthScreen;
