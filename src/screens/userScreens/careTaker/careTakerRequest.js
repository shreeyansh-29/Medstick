import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  caretakerReqClear,
  caretakerReqRequest,
} from '../../../redux/action/caretaker/caretakerRequestAction';
import {acceptCaretakerReqRequest} from '../../../redux/action/caretaker/acceptCaretakerReqAction';
import {deleteCaretakerReqRequest} from '../../../redux/action/caretaker/deleteCaretakerReqAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPallete} from '../../../components/atoms/colorPalette';
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomModal from '../../../components/molecules/customModal';
import {myCaretakerRequest} from '../../../redux/action/caretaker/myCaretakerAction';
import NoInternet from '../../../components/atoms/noInternet';

const CareTakerRequest = () => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.caretakerRequest);
  const [pageNo, setPageNo] = useState(0);
  const [caretakers, setCaretakers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const connected = useSelector(state => state.internetConnectivity?.data);

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
      setCaretakers([...caretakers, ...res.data]);
      dispatch(caretakerReqClear());
    }
  }, [res]);

  useEffect(() => {
    dispatch(caretakerReqRequest(pageNo));
  }, []);

  const onEnd = () => {
    let a = pageNo + 1;
    if (caretakers?.length % 8 === 0 && a !== 0 && res?.length !== 0) {
      dispatch(caretakerReqRequest(a));
    }
    setPageNo(a);
  };

  const acceptRequest = requestId => {
    let a = b => b.requestId == requestId;
    let index = caretakers.findIndex(a);
    caretakers.splice(index, 1);
    dispatch(acceptCaretakerReqRequest(requestId));
    dispatch(caretakerReqClear());
    setPageNo(0);

    setTimeout(() => {
      dispatch(caretakerReqRequest(pageNo));
    }, 500);
  };

  const deleteRequest = requestId => {
    let a = b => b.requestId == requestId;
    let index = caretakers.findIndex(a);
    caretakers.splice(index, 1);
    dispatch(deleteCaretakerReqRequest(requestId));
    dispatch(caretakerReqClear());
    setPageNo(0);

    setTimeout(() => {
      dispatch(caretakerReqRequest(pageNo));
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
                color={colorPallete.green1}
              />
              <View style={styles.space} />

              <Button
                onPress={() => {
                  deleteRequest(item.requestId);
                }}
                title="Delete"
                buttonStyle={styles.deleteButton}
                color={colorPallete.red1}
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
          {caretakers.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../../assets/images/noRequest.png')}
              />
            </View>
          ) : (
            <FlatList
              data={caretakers}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              onEndReached={onEnd}
              onEndReachedThreshold={0.01}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
      )}
      {connected ? null : <NoInternet />}
    </View>
  );
};

export default CareTakerRequest;
