import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {caretakerReqRequest} from '../../../redux/action/caretaker/caretakerRequestAction';
import {acceptCaretakerReqRequest} from '../../../redux/action/caretaker/acceptCaretakerReqAction';
import {deleteCaretakerReqRequest} from '../../../redux/action/caretaker/deleteCaretakerReqAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPalette} from '../../../components/atoms/colorPalette';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomModal from '../../../components/molecules/customModal';

const CareTakerRequest = () => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.caretakerRequest);
  const [pageNo, setPageNo] = useState(0);
  const [caretakers, setCaretakers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const loading = useSelector(state => state.caretakerRequest.isLoading);

  const images = [
    {
      url: uri,
    },
  ];

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
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setVisible(true);
                setUri(item.picPath);
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
                  {item.contact !== null ? 'Phone No: ' : null}
                  {item.contact !== null ? item.contact : null}
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
      {loading ? (
        <Loader />
      ) : (
        <>
          {caretakers.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
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
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
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
