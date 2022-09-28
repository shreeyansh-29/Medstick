import {Image, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {Button, Text} from 'react-native-elements';
import {styles} from '../../styles/otherScreensStyles/sendSnapToCaretakerStyles';
import Share from 'react-native-share';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {sendSnapRequest} from '../../redux/action/otherScreenAction/sendSnapAction';
import SubHeader from '../../components/molecules/headers/subHeader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShare, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {colorPalette} from '../../components/atoms/colorPalette';
import SelectBox from 'react-native-multi-selectbox';

const SendSnapToCaretaker = ({navigation}) => {
  let medName = '';
  let medId = 0;
  const dispatch = useDispatch();
  const route = useRoute();
  const {image_uri} = route.params;
  const isFocused = useIsFocused();
  const [mycaretakers, mycaretakerstate] = useState([]);
  const [medsArray, medsArrayState] = useState([]);
  const [selectedMed, setSelectedMed] = useState({});
  const [selectedCareTaker, setSelectedCareTaker] = useState({});

  const SendImage = async () => {
    setModalVisible(true);
    if (medName === '') {
      setModalVisible(false);
      showToast('Select medicine');
      return;
    }
    let todayDate = new Date();
    let setDate =
      todayDate.getDate() +
      '-' +
      (todayDate.getMonth() + 1) +
      '-' +
      todayDate.getFullYear();
    let imagesData = await AsyncStorage.getItem(setDate + ' ' + medName);
    if (imagesData !== null) {
      let parsedData = JSON.parse(imagesData);
      parsedData.push(image_uri);
      await AsyncStorage.setItem(
        setDate + ' ' + medName,
        JSON.stringify(parsedData),
      );
    } else {
      let parsedData = [];
      parsedData.push(image_uri);

      await AsyncStorage.setItem(
        setDate + ' ' + medName,
        JSON.stringify(parsedData),
      );
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
    formdata.append('id', send_to);
    formdata.append('medicineName', medName);
    formdata.append('medicineId', medId);

    dispatch(sendSnapRequest(formdata));
  };

  useEffect(() => {
    if (isFocused) {
      medsArrayState([
        {item: 'Cofsils', user_id: 123},
        {item: 'Metaformin', user_id: 121},
        {item: 'Losartan', user_id: 124},
        {item: 'Paracetamol', user_id: 120},
        {item: 'Antibiotoics', user_id: 123},
        {item: 'Gabapentin', user_id: 125},
        {item: 'PCM', user_id: 126},
        {item: 'PCM', user_id: 12},
      ]);
      let value = [
        {item: 'Anmol', caretakerId: 1},
        {item: 'Anurag', caretakerId: 2},
        {item: 'Shreeyansh', caretakerId: 3},
        {item: 'Anmol', caretakerId: 4},
        {item: 'Anurag', caretakerId: 5},
        {item: 'Shreeyansh', caretakerId: 6},
      ];
      mycaretakerstate(value);
    }
  }, [isFocused]);

  const Renderitem = ({mycaretakers}) => {
    function onChange() {
      return val => setSelectedCareTaker(val);
    }
    return (
      <View style={styles.renderCT}>
        <SelectBox
          label=""
          options={mycaretakers}
          value={selectedCareTaker}
          onChange={onChange()}
          hideInputFilter={true}
          selectIcon={
            <FontAwesomeIcon
              icon={faCaretDown}
              size={20}
              color={colorPalette.mainColor}
            />
          }
        />
      </View>
    );
  };

  const RenderMeds = ({medsArray}) => {
    function onChange() {
      return val => setSelectedMed(val);
    }

    return (
      <View style={styles.renderMeds}>
        <SelectBox
          label=""
          options={medsArray}
          value={selectedMed}
          onChange={onChange()}
          hideInputFilter={true}
          selectIcon={
            <FontAwesomeIcon
              icon={faCaretDown}
              size={20}
              color={colorPalette.mainColor}
            />
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SubHeader navigation={navigation} title={'Send Snap'} />
      <Toast visibilityTime={1500}></Toast>
      <View style={styles.parentCont}>
        <View style={styles.container1}>
          <Text style={styles.container1Text}>Image</Text>
          <TouchableOpacity
            onPress={async () => {
              const shareOptions = {
                title: 'Share file',
                email: 'email@example.com',
                social: Share.Social.EMAIL,
                failOnCancel: false,
                urls: [image_uri],
              };
              await Share.open(shareOptions);
            }}
            style={styles.shareCont}>
            <FontAwesomeIcon
              icon={faShare}
              color={colorPalette.basicColor}
              style={styles.shareIcon}
            />
            <Text style={styles.share}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imgContainer}>
          <Image source={{uri: image_uri}} style={styles.image} />
        </View>
        <View style={styles.mnView}>
          <Text style={styles.mnText}>Select Medicine</Text>
          <RenderMeds medsArray={medsArray} />
        </View>
        <View style={styles.cnView}>
          <Text style={styles.mnText}>Select Caretaker</Text>
          <Renderitem mycaretakers={mycaretakers} />
        </View>

        <Button
          onPress={SendImage}
          title="Send"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
      </View>
    </View>
  );
};

export default SendSnapToCaretaker;
