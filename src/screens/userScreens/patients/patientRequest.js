import {View, Image, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {patientsReqRequest} from '../../../redux/action/patients/patientsRequestAction';
import {acceptPatientReqRequest} from '../../../redux/action/patients/acceptPatientReqAction';

const PatientRequest = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [patients, setPatients] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);
  const res = useSelector(state => state.patientsRequest?.data);
  console.log(res);

  useEffect(() => {
    if (res !== null) {
      let list = res?.content?.map(item => {
        return {
          name: item.patient.userName,
          contact: item.patient.contact,
          requestId: item.requestId,
        };
      });
      setPatients([...patients, ...list]);
    }
  }, [res]);

  useEffect(() => {
    if (isFocused) {
      dispatch(patientsReqRequest(pageNo));
    }
  }, [pageNo, isFocused]);

  const onEnd = () => {
    setPageNo(pageNo + 1);
  };

  const renderLoader = () => {
    return res?.content?.length === 7 ? (
      <View style={{marginVertical: 26, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    ) : null;
  };

  const acceptRequest = requestId => {
    dispatch(acceptPatientReqRequest(requestId));
    dispatch(patientsReqRequest(pageNo));
  };

  const deleteRequest = requestId => {
    dispatch(acceptPatientReqRequest(requestId));
    dispatch(patientsReqRequest(pageNo));
  };

  const renderItem = ({item}) => {
    return (
      <Card style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.avatar}>
            <Avatar
              size={80}
              rounded
              source={require('../../../assets/images/shreeyansh.jpg')}
            />
          </View>
          <View style={styles.container1}>
            <ListItem
              style={styles.list}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              <ListItem.Content>
                <ListItem.Title style={styles.listTitle}>
                  {item.name}
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
                color="#4267B2"></Button>
              <View style={styles.space} />
              <Button
                onPress={() => {
                  deleteRequest(item.requestId);
                }}
                title="Delete"
                buttonStyle={styles.deleteButton}
                color="#e53935"></Button>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{flex: 1}}>
      {patients.length === 0 ? (
        <View
          style={{
            flex: 1,
            backgroundColor: colorPalette.basicColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 320, width: 240}}
            source={require('../../../assets/images/nopatientreq.png')}
          />
        </View>
      ) : (
        <FlatList
          data={patients}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          // keyExtractor={item => item.contact}
          numColumns={1}
          onEndReached={onEnd}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
        />
      )}
    </View>
  );
};

export default PatientRequest;
