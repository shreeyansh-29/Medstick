import {
  View,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SubHeader from '../molecules/headers/subHeader';
import {styles} from '../../styles/organisms/searchScreenStyles';
import LottieView from 'lottie-react-native';
import {colorPalette} from '../atoms/colorPalette';
import {Formik} from 'formik';
import * as yup from 'yup';
import UserAvatar from 'react-native-user-avatar';
import {ListItem} from 'react-native-elements';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {getUserRequest, resetUser} from '../../redux/action/getUserAction/getUserAction';
import {resetSend, sendReqRequest} from '../../redux/action/getUserAction/sendReqAction';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';
import CustomTextInput from '../atoms/customInputText';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const SearchScreen = ({navigation}) => {
  let route = useRoute();
  let sentby = route.params.sentBy;
  const dispatch = useDispatch();
  const res = useSelector(state => state.getUser?.data);
  console.log(res);
  const res1 = useSelector(state => state.sendRequest?.data);
  const [data, setData] = useState([]);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    dispatch(resetSend());
    dispatch(resetUser());
  },[])
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (res?.message === 'User fetched by email') {
      setData(res?.result);
    } else if (res?.message === 'Invitation sent to user with given email id') {
      Toast.show({
        type: 'info',
        text1: 'Invitation sent to user with given email id',
        position: 'bottom',
      });
    } else {
      setData([]);
    }
  }, [res]);

  useEffect(() => {
    if (res1?.status === 'Success') {
      Toast.show({
        type: 'success',
        text1: 'Request Send Successfully',
        position: 'bottom',
      });
    } else if (res1?.status === 'Failed') {
      Toast.show({
        type: 'error',
        text1: 'Already Present ',
        text2: 'In Your List',
        position: 'bottom',
      });
    } else if (res1?.status === 'Alert') {
      Toast.show({
        type: 'info',
        text1: 'Request Already Sent',
        position: 'bottom',
      });
    }
  }, [res1]);

  const sendMailToUser = async email => {
    let currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser.user.email === email) {
      Toast.show({
        type: 'error',
        text1: "Can't Add Yourself",
        position: 'bottom',
      });
      return;
    }
    dispatch(getUserRequest(email));
  };

  const sendReqToCaretaker = patient_id => {
    dispatch(sendReqRequest({patient_id, sentby}));
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.card}>
          <View style={styles.mainView}>
            <ListItem style={styles.listView}>
              <ListItem.Content>
                <View style={styles.cont}>
                  <UserAvatar size={42} name={item.userName} />
                  <View style={styles.cardTitle}>
                    <ListItem.Title style={styles.font}>
                      {item.userName}
                    </ListItem.Title>
                    <ListItem.Subtitle>{item.contact}</ListItem.Subtitle>
                  </View>
                </View>
              </ListItem.Content>
              <TouchableOpacity
                style={styles.listButton}
                onPress={() => {
                  sendReqToCaretaker(item.id);
                }}>
                <Text style={styles.text1}>Send Request</Text>
              </TouchableOpacity>
            </ListItem>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Toast />
      <SubHeader navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 20}
        enabled={Platform.OS === 'ios' ? true : false}>
        <View style={styles.form}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: ''}}
            onSubmit={values => sendMailToUser(values.email)}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <>
                <View style={styles.formView}>
                  <CustomTextInput
                    placeholder="Search By Email"
                    textContentType="emailAddress"
                    placeholderTextColor={colorPalette.mainColor}
                    mode="flat"
                    text="email"
                    handleChange={handleChange}
                    styles={styles.field}
                    value={values.email}
                    outlineColor={colorPalette.mainColor}
                    activeOutlineColor={colorPalette.mainColor}
                  />

                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      size={22}
                      color={colorPalette.mainColor}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.text}>{touched.email && errors.email}</Text>
              </>
            )}
          </Formik>
        </View>
        {data.length === 0 ? (
          <View style={styles.lottieCont}>
            <LottieView
              source={require('../../assets/animation/user.json')}
              speed={0.6}
              progress={progress}
              style={styles.lottie}
            />
          </View>
        ) : (
          <View style={styles.flatList}>
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default SearchScreen;

