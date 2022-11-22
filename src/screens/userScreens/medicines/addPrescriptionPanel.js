import {View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
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
import CustomModal from '../../../components/molecules/customModal';
import {getPrescription} from '../../../utils/storage';
import {useIsFocused} from '@react-navigation/native';

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
      <CustomModal
        modalVisible={visible}
        text="imageViewer"
        onRequestClose={() => setVisible(!visible)}
        modalView={<ImageViewer imageUrls={images} backgroundColor="white" />}
      />

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

      {prescriptionList?.length === 0 ? (
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
          style={{marginBottom: 50}}
          data={prescriptionList}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
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
            <CustomButton
              titleStyle={{fontSize: 18}}
              title={'Save'}
              btnStyles={{
                backgroundColor: colorPalette.mainColor,
                width: '50%',
                borderRadius: 5,
              }}
              contStyles={{alignItems: 'center', marginBottom: 8}}
              handleSubmit={() => {
                if (prescriptionId !== null) {
                  let a = b => b.prescriptionId === prescriptionId;
                  let index = prescriptionList.findIndex(a);
                  let data = prescriptionList[index];
                  prescriptionObject(data);
                  Toast.show({
                    text1: 'Prescription Uploaded',
                    type: 'success',
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
      <Toast visibilityTime={500} />
    </View>
  );
};

export default AddPrescriptionPanel;
