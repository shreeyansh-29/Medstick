import {View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  patientsReqClear,
  patientsReqRequest,
} from '../../../redux/action/patients/patientsRequestAction';
import {acceptPatientReqRequest} from '../../../redux/action/patients/acceptPatientReqAction';
import CustomImage from '../../../components/atoms/customImage';
import Loader from '../../../components/atoms/loader';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomModal from '../../../components/molecules/customModal';
import {deletePatientReqRequest} from '../../../redux/action/patients/deletePatientReqAction';
import {colorPalette} from '../../../components/atoms/colorPalette';

const PatientRequest = ({
  patients,
  setPatients,
  currentPage,
  setCurrentPage,
  setPageNo,
  setMyPatients,
}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.patientsRequest);
  const [uri, setUri] = useState('');
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    {
      url: uri,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (res?.data !== null) {
      setPatients([...patients, ...res.data]);
      dispatch(patientsReqClear());
    }
  }, [res]);

  console.log(currentPage, 'hoja');

  useEffect(() => {
    currentPage === 0 ? dispatch(patientsReqRequest(currentPage)) : null;
  }, [currentPage]);

  const onEnd = () => {
    console.log('ye call hora h');
    let a = currentPage + 1;
    if (patients?.length % 8 === 0 && a !== 0 && res?.length !== 0) {
      dispatch(patientsReqRequest(a));
    }
    setCurrentPage(a);
  };

  const acceptRequest = requestId => {
    let a = b => b.requestId == requestId;
    let index = patients.findIndex(a);
    dispatch(acceptPatientReqRequest(requestId));
    dispatch(patientsReqClear());
    patients.splice(index, 1);
    setPageNo(0);
    setCurrentPage(0);
    setMyPatients([]);
    setPatients([]);

    setTimeout(() => {
      dispatch(patientsReqRequest(currentPage));
    }, 500);
  };

  const deleteRequest = requestId => {
    let a = b => b.requestId == requestId;
    let index = patients.findIndex(a);
    patients.splice(index, 1);
    dispatch(deletePatientReqRequest(requestId));
    dispatch(patientsReqClear());
    setCurrentPage(0);
    // setPatients([]);

    setTimeout(() => {
      dispatch(patientsReqRequest(currentPage));
    }, 1000);
  };

  const renderItem = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.avatar}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setVisible(true);
                setUri(item?.picPath);
              }}>
              <Avatar size={80} rounded source={{uri: item.picPath}} />
            </TouchableOpacity>
          </View>
          <View style={styles.container1}>
            <ListItem
              style={styles.list}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.userName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.contact}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View style={styles.buttonView}>
              <Button
                onPress={() => {
                  acceptRequest(item.requestId);
                }}
                title="Confirm"
                buttonStyle={styles.confirmButton}
                color={colorPalette.green1}
              />
              <View style={styles.space} />
              <Button
                onPress={() => {
                  deleteRequest(item.requestId);
                }}
                title="Delete"
                buttonStyle={styles.deleteButton}
                color={colorPalette.red1}
              />
            </View>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <CustomModal
        text="imageViewer"
        modalVisible={visible}
        onRequestClose={() => setVisible(!visible)}
        modalView={<ImageViewer imageUrls={images} />}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {patients.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../../assets/images/noRequest.png')}
              />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <FlatList
                data={patients}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(index, item) => index.toString()}
                onEndReached={onEnd}
                onEndReachedThreshold={0.01}
                style={{backgroundColor: 'yellow'}}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default PatientRequest;
