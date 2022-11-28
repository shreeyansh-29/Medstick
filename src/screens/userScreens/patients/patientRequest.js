import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
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
import {colorPalette} from '../../../components/atoms/colorPalette';
import CustomModal from '../../../components/molecules/customModal';
import {deletePatientReqRequest} from '../../../redux/action/patients/deletePatientReqAction';
import {myPatientsRequest} from '../../../redux/action/patients/myPatientsAction';

const PatientRequest = () => {
  const dispatch = useDispatch();
  const [patients, setPatients] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const res = useSelector(state => state.patientsRequest);
  console.log(res);
  const loading = useSelector(state => state.patientsRequest.isLoading);
  const [uri, setUri] = useState('');
  const [visible, setVisible] = useState(false);

  const images = [
    {
      url: uri,
    },
  ];

  useEffect(() => {
    if (res?.data !== null) {
      setPatients(res.data);
    }
  }, [res]);

  useEffect(() => {
    dispatch(patientsReqRequest(pageNo));
  }, []);

  // const loadMoreItem = () => {
  //   let a = pageNo + 1;
  //   dispatch(patientsReqRequest(a));
  //   setPageNo(a);
  // };

  // const renderLoader = () => {
  //   return res?.content?.length === 7 ? (
  //     <View style={{marginVertical: 26, alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color={colorPalette.mainColor} />
  //     </View>
  //   ) : null;
  // };

  const acceptRequest = requestId => {
    let a = b => b.requestId == requestId;
    let index = patients.findIndex(a);
    dispatch(acceptPatientReqRequest(requestId));
    dispatch(patientsReqClear());
    patients.splice(index, 1);

    setTimeout(() => {
      dispatch(patientsReqRequest(0));
      dispatch(myPatientsRequest(0));
    }, 500);
  };

  const deleteRequest = requestId => {
    let a = b => b.requestId == requestId;
    let index = patients.findIndex(a);
    patients.splice(index, 1);
    dispatch(deletePatientReqRequest(requestId));
    dispatch(patientsReqClear());

    setTimeout(() => {
      dispatch(patientsReqRequest(0));
      dispatch(myPatientsRequest(0));
    }, 500);
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
                color="#4267B2"
              />
              <View style={styles.space} />
              <Button
                onPress={() => {
                  deleteRequest(item.requestId);
                }}
                title="Delete"
                buttonStyle={styles.deleteButton}
                color="#e53935"
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
      {loading ? (
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
            <FlatList
              data={patients}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(index, item) => index.toString()}
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(patientsReqRequest(pageNo));
                    setRefresh(false);
                  }}
                />
              }
              // numColumns={1}
              // onEndReached={onEnd}
              // ListFooterComponent={renderLoader}
              // onEndReachedThreshold={0}
            />
          )}
        </>
      )}
    </View>
  );
};

export default PatientRequest;
