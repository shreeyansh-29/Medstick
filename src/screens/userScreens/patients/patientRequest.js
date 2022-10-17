import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {patientsReqRequest} from '../../../redux/action/patients/patientsRequestAction';
import {acceptPatientReqRequest} from '../../../redux/action/patients/acceptPatientReqAction';
import CustomImage from '../../../components/atoms/customImage';
import Loader from '../../../components/atoms/loader';

const PatientRequest = () => {
  const dispatch = useDispatch();
  const [patients, setPatients] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const res = useSelector(state => state.patientsRequest);
  const loading = useSelector(state => state.patientsRequest.isLoading);
  // console.log(res);

  useEffect(() => {
    if (res?.data !== null) {
      setPatients([...res.data]);
    } else {
      setPatients([]);
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
    dispatch(acceptPatientReqRequest(requestId));
    setTimeout(() => {
      dispatch(patientsReqRequest(pageNo));
    }, 1000);
  };

  const deleteRequest = requestId => {
    dispatch(acceptPatientReqRequest(requestId));
    setTimeout(() => {
      dispatch(patientsReqRequest(pageNo));
    }, 1000);
  };

  const renderItem = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.avatar}>
            <Avatar size={80} rounded source={{uri: item.user.picPath}} />
          </View>
          <View style={styles.container1}>
            <ListItem
              style={styles.list}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.user.userName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {item.user.contact}
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
      {loading ? (
        <Loader />
      ) : (
        <>
          {patients.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../../assets/images/nopatientreq.png')}
              />
            </View>
          ) : (
            <FlatList
              data={patients}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
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
