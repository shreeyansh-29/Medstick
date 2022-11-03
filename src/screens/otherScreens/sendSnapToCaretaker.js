import {
  View,
  Text,
  Modal,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';
import ImageViewer from 'react-native-image-zoom-viewer';
import LottieView from 'lottie-react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Share from 'react-native-share';
import {Divider} from 'react-native-paper';
import {Button} from 'react-native-elements';
import {styles} from '../../styles/otherScreensStyles/sendSnapToCaretakerStyles';
import SelectBox from 'react-native-multi-selectbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {myCaretakerRequest} from '../../redux/action/caretaker/myCaretakerAction';

const height = Dimensions.get('window').height;

const SendSnapToCaretaker = ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const sheetRef = useRef(null);
  const [mycaretakers, mycaretakerstate] = useState([]);
  const [medsArray, medsArrayState] = useState([]);
  const [selectedMed, setSelectedMed] = useState({});
  const [selectedCareTaker, setSelectedCareTaker] = useState({});

  // const dispatch = useDispatch();
  // let res = useSelector(state => state.myCaretaker);
  // console.log(res);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const {image_uri} = route.params;
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: image_uri,
    },
  ];

  useEffect(() => {
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
  }, []);

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

  const SendImage = () => {
    navigation.pop(2);
  };

  const renderContent = () => (
    <View
      style={{
        height: height / 1.2,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: '700',
          color: 'black',
        }}>
        Send Image To CareTaker
      </Text>
      <View style={styles.mnView}>
        <Text style={styles.mnText}>Select Medicine</Text>
        <RenderMeds medsArray={medsArray} />
      </View>
      <View style={styles.cnView}>
        <Text style={styles.mnText}>Select Caretaker</Text>
        <Renderitem mycaretakers={mycaretakers} />
      </View>

      <TouchableOpacity activeOpacity={1} onPress={() => setVisible(true)}>
        <Text style={{color: 'black', fontSize: 18}}>View Image</Text>
      </TouchableOpacity>
      <View
        style={{marginVertical: 8, flexDirection: 'row', alignItems: 'center'}}>
        <Divider
          style={{
            height: 1,
            color: 'grey',
            width: '6%',
          }}
        />
        <Text style={{paddingHorizontal: 6, marginVertical: 6}}>Or</Text>
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
        containerStyle={{marginVertical: 40}}
      />
    </View>
  );

  return (
    <View style={{flex: 1, backgroundColor: colorPalette.mainColor}}>
      <SubHeader
        navigation={navigation}
        title={'Send Snap'}
        options={options}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <LottieView
          style={{width: '42%'}}
          progress={progress}
          speed={0.6}
          source={require('../../assets/animation/share.json')}
        />
      </View>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(!visible)}>
        <ImageViewer imageUrls={images} />
      </Modal>
      <BottomSheet
        ref={sheetRef}
        enabledInnerScrolling={true}
        snapPoints={[500, 440, 50]}
        borderRadius={40}
        renderContent={renderContent}
      />
    </View>
  );
};

export default SendSnapToCaretaker;
