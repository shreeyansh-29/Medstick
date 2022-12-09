import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {Divider} from 'react-native-paper';
import CustomImage from '../../../components/atoms/customImage';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import {
  faImage,
  faSquare,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomButton from '../../../components/atoms/customButton';
import Toast from 'react-native-toast-message';
import CustomModal from '../../../components/molecules/customModal';
import {getPrescription} from '../../../utils/storage';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../components/atoms/loader';

const AddPrescriptionPanel = ({navigation, route}) => {
  let {prescriptionObject} = route?.params;
  const isFocused = useIsFocused();
  const [uri, setUri] = useState('');
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: uri,
    },
  ];
  const [prescriptionId, setPrescriptionId] = useState('');
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      false;
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPrescription().then(data => {
        if (data !== null) {
          setPrescriptionList(data);
        }
      });
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 200}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (prescriptionId === item?.prescriptionId) {
              setPrescriptionId('');
              setDeleteBtn(false);
            } else {
              setPrescriptionId(item?.prescriptionId);
              setDeleteBtn(true);
            }
          }}>
          <View style={styles.listView}>
            <ListItem
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
              style={styles.list}>
              <ListItem.Content style={styles.content}>
                <ListItem.Title style={styles.title}>
                  {`${item.doctorName}`}
                </ListItem.Title>
                <ListItem.Title style={{}}>
                  {`${item.specialization}`}
                </ListItem.Title>
              </ListItem.Content>
              <View style={styles.touchableView}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={{padding: 10}}
                  onPress={() => {
                    setVisible(true);
                    setUri(item.prescriptionUrl);
                  }}>
                  <FontAwesomeIcon
                    icon={faImage}
                    size={20}
                    color={colorPallete.mainColor}
                  />
                </TouchableOpacity>

                {prescriptionId === item?.prescriptionId ? (
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    size={20}
                    setSelected
                    color={colorPallete.mainColor}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSquare}
                    size={20}
                    color={colorPallete.mainColor}
                  />
                )}
              </View>
            </ListItem>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  return (
    <View style={styles.mainView}>
      <SubHeader
        navigation={navigation}
        title={'Add Prescription'}
        deleteBtn={deleteBtn}
        prescriptionId={prescriptionId}
        setPrescriptionList={setPrescriptionList}
        setPrescriptionId={setPrescriptionId}
        setDeleteBtn={setDeleteBtn}
      />
      <CustomModal
        modalVisible={visible}
        text="imageViewer"
        onRequestClose={() => setVisible(!visible)}
        modalView={<ImageViewer imageUrls={images} backgroundColor="white" />}
      />

      <View style={styles.textContainer}>
        <Text style={styles.text}>Select Prescription</Text>
      </View>
      <Divider style={styles.divider} />

      {showLoader ? (
        <Loader />
      ) : (
        <>
          {prescriptionList?.length === 0 ? (
            <View style={styles.imgCont}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/noPrescription.png')}
                styles={styles.img}
              />
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              data={prescriptionList}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            />
          )}
        </>
      )}

      <View style={styles.button}>
        {prescriptionId ? (
          <>
            <CustomButton
              titleStyle={styles.buttonText}
              title={'Save'}
              btnStyles={styles.btnStyles}
              contStyles={styles.contStyles}
              handleSubmit={() => {
                if (prescriptionId !== null) {
                  let a = b => b.prescriptionId === prescriptionId;
                  let index = prescriptionList.findIndex(a);
                  let data = prescriptionList[index];
                  prescriptionObject(data);
                  Toast.show({
                    text1: 'Prescription Uploaded',
                    type: 'success',
                    position: 'bottom',
                  });
                  setTimeout(() => {
                    navigation.pop();
                  }, 1000);
                }
              }}
            />
          </>
        ) : (
          <>
            <CustomButton
              title={'Upload New'}
              titleStyle={styles.buttonText}
              btnStyles={styles.btnStyles}
              contStyles={styles.contStyles}
              handleSubmit={() => {
                navigation.navigate('Prescription');
              }}
            />
          </>
        )}
      </View>
      <Toast visibilityTime={500} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1, backgroundColor: colorPallete.basicColor},
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    color: colorPallete.mainColor,
    fontSize: 20,
    fontWeight: '400',
  },
  divider: {height: 1, marginVertical: 8},
  imgCont: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 1.274,
  },
  img: {width: '70%'},
  flatList: {marginBottom: 50},
  button: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {fontSize: 18},
  btnStyles: {
    backgroundColor: colorPallete.mainColor,
    width: '50%',
    borderRadius: 5,
  },
  contStyles: {alignItems: 'center', marginBottom: 8},
  listView: {flexDirection: 'row'},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  title: {fontWeight: '500', fontSize: 18, marginBottom: 4},
  touchableView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    marginRight: 12,
    alignItems: 'center',
  },
  content: {marginLeft: 10},
});

export default AddPrescriptionPanel;
