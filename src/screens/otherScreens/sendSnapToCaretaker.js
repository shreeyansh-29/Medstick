import {View, Text, Animated, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import ImageViewer from 'react-native-image-zoom-viewer';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';
import {styles} from '../../styles/otherScreensStyles/sendSnapToCaretakerStyles';
import {Divider} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {myCaretakerRequest} from '../../redux/action/caretaker/myCaretakerAction';
import Toast from 'react-native-toast-message';
import {
  sendSnapClear,
  sendSnapRequest,
} from '../../redux/action/otherScreenAction/sendSnapAction';
import CustomButton from '../../components/atoms/customButton';
import CustomModal from '../../components/molecules/customModal';
import ImagePicker from 'react-native-image-crop-picker';
import {getMedicine} from '../../utils/storage';

const SendSnapToCaretaker = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [mycaretakers, mycaretakerstate] = useState([]);
  const [medsArray, medsArrayState] = useState([]);
  const dispatch = useDispatch();
  let res = useSelector(state => state.myCaretaker);
  let res1 = useSelector(state => state.sendSnap?.data);
  const [selectCaretaker, setSelectCaretaker] = useState('');
  const [selectMedicine, setSelectMedicine] = useState('');
  const [selectedMedId, setSelectedMedId] = useState('');
  const [selectedCaketakerId, setSelectedCaketakerId] = useState('');

  const [image, setImage] = useState('');

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  useEffect(() => {
    openCamera();
  }, []);

  useEffect(() => {
    if (res1?.status === 'Success') {
      Toast.show({
        type: 'success',
        text1: 'Image Sent Successfully',
      });
      setTimeout(() => {
        navigation.pop();
      }, 1000);
    }
    if (res1?.status === 'Failed') {
      Toast.show({
        type: 'error',
        text1: 'Something Went Wrong',
        text2: 'Try Again',
      });
    }
    dispatch(sendSnapClear());
  }, [res1]);

  useEffect(() => {
    dispatch(myCaretakerRequest(0));
    userMeds();
  }, []);

  const userMeds = () => {
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        medsArrayState(
          data.map(item => {
            return {
              label: item.medicineName,
              value: item.medicineName,
              id: item.userMedicineId,
            };
          }),
        );
      }
    });
  };

  useEffect(() => {
    if (res?.data !== null) {
      mycaretakerstate(
        res?.data?.map(item => {
          return {
            label: item.userName,
            value: item.userName,
            id: item.userId,
          };
        }),
      );
    }
  }, [res]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const images = [
    {
      url: image,
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
      uri: image,
      type: 'image/jpg',
    });
    formdata.append('name', file_name);
    formdata.append('id', selectedCaketakerId);
    formdata.append('medicineName', selectMedicine);
    formdata.append('userMedicineId', selectedMedId);

    dispatch(sendSnapRequest(formdata));
  };

  return (
    <View style={styles.container}>
      <SubHeader
        navigation={navigation}
        title={'Send Snap'}
        options={options}
      />
      <CustomModal
        modalVisible={modalVisible}
        text="imageViewer"
        onRequestClose={() => setModalVisible(!modalVisible)}
        modalView={<ImageViewer imageUrls={images} backgroundColor="white" />}
      />

      <View style={styles.lottieView}>
        <LottieView
          style={styles.lottie}
          progress={progress}
          speed={0.6}
          source={require('../../assets/animation/share.json')}
        />
      </View>
      <View style={styles.mainView}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollCont}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Send Image To CareTaker</Text>
          </View>
          <View style={styles.dropdownCont}>
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

          <View style={styles.dropdownCont}>
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
            style={styles.imgCont}>
            <Text style={styles.imgText}>View Image</Text>
          </TouchableOpacity>

          <View style={styles.dividerCont}>
            <Divider style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <Divider style={styles.divider} />
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => openCamera()}>
            <Text style={styles.imgText}>Re-Take</Text>
          </TouchableOpacity>

          <CustomButton
            handleSubmit={SendImage}
            title="Send"
            btnStyles={styles.btnStyle}
            contStyles={styles.btnContainer}
          />
        </ScrollView>
      </View>
      <Toast visibilityTime={500} />
    </View>
  );
};

export default SendSnapToCaretaker;
