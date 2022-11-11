import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddPrescriptionPanelHeader from '../../../components/molecules/headers/addPrescriptionPanelHeader';
import AddNewPrescription from '../../../components/molecules/addNewPrescription';
import ExistingPrescriptionText from '../../../components/atoms/existingPrescriptionText';
import {useDispatch, useSelector} from 'react-redux';
import {loadGetPrescription} from '../../../redux/action/doctorPrescription/getPrescriptionAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoData from '../../../components/atoms/noData';
import {colorPalette} from '../../../components/atoms/colorPalette';
import PrescriptionBox from '../../../components/atoms/prescriptionBox';
import SubHeader from '../../../components/molecules/headers/subHeader';
import Foundation from 'react-native-vector-icons/Foundation';
import {Divider} from 'react-native-paper';
import Loader from '../../../components/atoms/loader';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import {myPrescriptionsRequest} from '../../../redux/action/otherScreenAction/prescriptionsAction';
import {useFocusEffect} from '@react-navigation/native';

const AddPrescriptionPanel = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [prescriptions, setPrescriptions] = useState([]);
  const [uri, setUri] = useState('');
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: uri,
    },
  ];
  const [prescriptionId, setPrescriptionId] = useState('');
  const res = useSelector(state => state.myPrescriptions);
  console.log(res);
  const loading = useSelector(state => state.myPrescriptions?.isLoading);

  useEffect(() => {
    if (res?.data !== null) {
      setPrescriptions(res?.data);
    }
  }, [res]);

  console.log(prescriptions);

  useFocusEffect(
    React.useCallback(() => {
      const getPrescriptions = async () => {
        const Id = await AsyncStorage.getItem('user_id');
        dispatch(myPrescriptionsRequest({currentPage, Id}));
      };

      getPrescriptions();
      return () => {
        true;
      };
    }, []),
  );

  const renderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 200}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (prescriptionId === item?.prescriptionId) {
              setPrescriptionId('');
            } else {
              setPrescriptionId(item?.prescriptionId);
            }
          }}>
          <View style={{flexDirection: 'row'}}>
            <ListItem
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <ListItem.Content style={{marginLeft: 10}}>
                <ListItem.Title
                  style={{fontWeight: '500', fontSize: 18, marginBottom: 4}}>
                  {`${item.doctorName}`}
                </ListItem.Title>
                <ListItem.Title style={{}}>
                  {`${item.specialization}`}
                </ListItem.Title>
              </ListItem.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '20%',

                  marginRight: 12,
                  alignItems: 'center',
                }}>
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
                    color={colorPalette.mainColor}
                  />
                </TouchableOpacity>

                {prescriptionId === item?.prescriptionId ? (
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    size={20}
                    setSelected
                    color={colorPalette.mainColor}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSquare}
                    size={20}
                    color={colorPalette.mainColor}
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
    <View style={{flex: 1, backgroundColor: colorPalette.basicColor}}>
      <SubHeader navigation={navigation} title={'Add Prescription'} />
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(!visible)}>
        <ImageViewer imageUrls={images} />
      </Modal>

      <View
        style={{
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colorPalette.mainColor,
            fontSize: 20,
            fontWeight: '400',
          }}>
          Select Prescription
        </Text>
      </View>
      <Divider style={{height: 1, marginVertical: 8}} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {prescriptions?.length === 0 ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: Dimensions.get('window').height / 1.274,
              }}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/noPrescription.png')}
                styles={{width: '70%'}}
              />
            </View>
          ) : (
            <FlatList
              data={prescriptions}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            />
          )}
        </>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          width: '100%',
        }}>
        {prescriptionId ? (
          <>
            {/* <View
              style={{
                alignSelf: 'center',
                width: '87.5%',
              }}>
              <Divider
                style={{
                  height: 1,
                  marginVertical: 13.5,
                }}
              />
            </View> */}
            <CustomButton
              titleStyle={{fontSize: 18}}
              title={'Save'}
              btnStyles={{
                backgroundColor: colorPalette.mainColor,
                width: '50%',
                borderRadius: 5,
              }}
              contStyles={{alignItems: 'center', marginBottom: 8}}
              handleSubmit={async () => {
                await AsyncStorage.setItem('prescription_id', prescriptionId);
                Toast.show({
                  type: 'success',
                  text1: 'Prescription Added Successfully',
                });
                setTimeout(() => {
                  navigation.pop();
                }, 2000);
              }}
            />
          </>
        ) : (
          <>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Divider
                style={{
                  height: 1,
                  color: 'grey',
                  width: '40%',
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
                  width: '40%',
                }}
              />
            </View> */}
            <CustomButton
              title={'Upload New'}
              titleStyle={{fontSize: 18}}
              btnStyles={{
                backgroundColor: colorPalette.mainColor,
                width: '50%',
                borderRadius: 5,
              }}
              contStyles={{alignItems: 'center', marginBottom: 8}}
              handleSubmit={() => {
                navigation.navigate('Prescription');
              }}
            />
          </>
        )}
      </View>
      {/* <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            borderRadius: 4,
            backgroundColor: colorPalette.mainColor,
          }}
          onPress={() => {
            navigation.navigate('Prescription');
          }}>
          <Text
            style={{
              fontSize: 18,
              padding: 20,
              color: 'white',
            }}>
            Upload New Prescription
          </Text>
        </TouchableOpacity>
      </View> */}
      <Toast />
    </View>
  );
};

export default AddPrescriptionPanel;

{
  /* {getAllPrescription?.data?.result?.length === 0 ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/images/noPrescription.png')}
              resizeMode="contain"
              style={{width: '80%'}}
            />
          </View>
        ) : (
          getAllPrescription?.map(item => (
            <PrescriptionBox
              doctorName={item.doctorName}
              locations={item.location}
              contact={item.contact}
              specialization={item.specialization}
            />
          ))
        )} */
}
