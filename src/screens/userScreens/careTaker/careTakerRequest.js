import {FlatList, RefreshControl, View} from 'react-native';
import React, {useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {caretakerReqRequest} from '../../../redux/action/caretaker/caretakerRequestAction';
import {acceptCaretakerReqRequest} from '../../../redux/action/caretaker/acceptCaretakerReqAction';
import {deleteCaretakerReqRequest} from '../../../redux/action/caretaker/deleteCaretakerReqAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';

const CareTakerRequest = () => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.caretakerRequest);
  // console.log('caretakerReq', res);
  const [pageNo, setPageNo] = useState(0);
  const [caretakers, setCaretakers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (res?.data !== null) {
      setCaretakers([...res.data]);
    } else if (res?.data === null) {
      setCaretakers([]);
    }
  }, [res]);

  useEffect(() => {
    dispatch(caretakerReqRequest(pageNo));
  }, []);

  // const loadMoreItem = () => {
  //   if (res?.data?.length === 7) {
  //     let a = pageNo + 1;
  //     dispatch(caretakerReqRequest(a));
  //     setPageNo(a);
  //   }
  // };

  // const fetchCaretakerReq = () => {
  //   dispatch(caretakerReqRequest(pageNo));
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     fetchCaretakerReq();

  //     return () => {};
  //   }, []),
  // );

  const acceptRequest = requestId => {
    dispatch(acceptCaretakerReqRequest(requestId));
    setTimeout(() => {
      dispatch(caretakerReqRequest(pageNo));
    }, 1000);
  };

  const deleteRequest = requestId => {
    dispatch(deleteCaretakerReqRequest(requestId));
    setTimeout(() => {
      dispatch(caretakerReqRequest(pageNo));
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
                  {item.user.contact !== null ? 'Phone No: ' : null}
                  {item.user.contact !== null ? item.user.contact : null}
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
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      {res?.isLoading ? (
        <Loader />
      ) : (
        <>
          {caretakers.length === 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: colorPalette.basicColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomImage
                resizeMode="contain"
                styles={{height: 320, width: 240}}
                source={require('../../../assets/images/nocaretakers.jpg')}
              />
            </View>
          ) : (
            <FlatList
              data={caretakers}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              // onEndReached={loadMoreItem}
              // onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(caretakerReqRequest(pageNo));
                    setRefresh(false);
                  }}
                />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default CareTakerRequest;
