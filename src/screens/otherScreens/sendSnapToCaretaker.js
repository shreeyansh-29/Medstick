import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';
import ImageViewer from 'react-native-image-zoom-viewer';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';
import {Button} from 'react-native-elements';
import {styles} from '../../styles/otherScreensStyles/sendSnapToCaretakerStyles';
import {Divider} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {myCaretakerRequest} from '../../redux/action/caretaker/myCaretakerAction';
import {loadMedicineList} from '../../redux/action/userMedicine/medicineListAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {sendSnapRequest} from '../../redux/action/otherScreenAction/sendSnapAction';

const SendSnapToCaretaker = ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [mycaretakers, mycaretakerstate] = useState([]);
  const [medsArray, medsArrayState] = useState([]);
  const dispatch = useDispatch();
  let res = useSelector(state => state.myCaretaker);
  let meds = useSelector(state => state.medicineList);
  const [selectCaretaker, setSelectCaretaker] = useState('');
  const [selectMedicine, setSelectMedicine] = useState('');
  const [selectedMedId, setSelectedMedId] = useState('');
  const [selectedCaketakerId, setSelectedCaketakerId] = useState('');

  const userMeds = async () => {
    dispatch(loadMedicineList(await AsyncStorage.getItem('user_id')));
  };

  useEffect(() => {
    dispatch(myCaretakerRequest(0));
    userMeds();
  }, []);

  useEffect(() => {
    if (res?.data !== null && meds?.data !== null) {
      mycaretakerstate(
        res?.data?.map(item => {
          return {
            label: item.userName,
            value: item.userName,
            id: item.userId,
          };
        }),
      );
      medsArrayState(
        meds?.data?.map(item => {
          return {
            label: item.medicineName,
            value: item.medicineName,
            medId: item.userMedicineId,
          };
        }),
      );
    }
  }, [res, meds]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const {image_uri} = route.params;
  console.log(image_uri);
  const [modalVisible, setModalVisible] = useState(false);
  const images = [
    {
      url: image_uri,
    },
  ];

  const options = async () => {
    const shareOptions = {
      title: 'Share file',
      email: 'email@example.com',
      social: Share.Social.EMAIL,
      failOnCancel: false,
      // urls: [image_uri],
    };
    await Share.open(shareOptions);
  };

  const SendImage = async () => {
    if (selectMedicine === '') {
      Toast.show({
        type: 'error',
        text1: 'Select Medicine',
      });
      return;
    }
    if (selectCaretaker === '') {
      Toast.show({
        type: 'error',
        text1: 'Select Caretaker',
      });
      return;
    }

    const formdata = new FormData();
    var dt = new Date().getTime();

    var file_name = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );

    formdata.append('image', {
      name: 'care',
      uri: image_uri,
      type: 'image/jpg',
    });
    formdata.append('name', file_name);
    formdata.append('id', selectedCaketakerId);
    formdata.append('medicineName', selectMedicine);
    formdata.append('userMedicineId', selectedMedId);

    dispatch(sendSnapRequest(formdata));
  };

  return (
    <View style={{flex: 1, backgroundColor: colorPalette.mainColor}}>
      <SubHeader
        navigation={navigation}
        title={'Send Snap'}
        options={options}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          style={{width: '42%'}}
          progress={progress}
          speed={0.6}
          source={require('../../assets/animation/share.json')}
        />
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <ImageViewer imageUrls={images} />
      </Modal>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: 'white',
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          flex: 1,
          marginTop: 16,
        }}>
        <ScrollView
          style={{width: '80%'}}
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <View style={{marginTop: 20, marginBottom: 30}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
              }}>
              Send Image To CareTaker
            </Text>
          </View>
          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.mnText}>Select Medicine</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={medsArray}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={selectMedicine}
              onChange={item => {
                setSelectMedicine(item.value);
                setSelectedMedId(item.medId);
              }}
              itemTextStyle={{color: 'black'}}
            />
          </View>

          <View style={{marginBottom: 20, width: '90%'}}>
            <Text style={styles.mnText}>Select CareTaker</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={mycaretakers}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={selectCaretaker}
              onChange={item => {
                setSelectCaretaker(item.value);
                setSelectedCaketakerId(item.id);
              }}
              itemTextStyle={styles.textStyle}
            />
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(true)}
            style={{marginTop: 10}}>
            <Text style={{color: 'black', fontSize: 18}}>View Image</Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: 8,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Divider
              style={{
                height: 1,
                color: 'grey',
                width: '6%',
              }}
            />
            <Text
              style={{
                paddingHorizontal: 6,
                marginVertical: 6,
                color: 'black',
              }}>
              Or
            </Text>
            <Divider
              style={{
                height: 1,
                color: 'grey',
                width: '6%',
              }}
            />
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => navigation.pop()}>
            <Text style={{color: 'black', fontSize: 18}}>Re-Take</Text>
          </TouchableOpacity>
          <Button
            onPress={SendImage}
            title="Send"
            buttonStyle={{
              backgroundColor: colorPalette.mainColor,
              borderRadius: 6,
              paddingHorizontal: 40,
              paddingVertical: 10,
            }}
            containerStyle={{marginTop: 40, marginBottom: 80}}
          />
        </ScrollView>
      </View>
      <Toast visibilityTime={2000} />
    </View>
  );
};

export default SendSnapToCaretaker;
