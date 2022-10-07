import {FlatList, Image, RefreshControl, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {styles} from '../../../styles/careTakerStyles/careTakerRequestStyles';
import {Card} from 'react-native-paper';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {caretakerRequestRequest} from '../../../redux/action/caretakerAction/caretakerRequestAction';
import {myCaretakerSelector} from '../../../constants/Selector/myCaretakerSelector';

const CareTakerRequest = () => {
  const res = useSelector(myCaretakerSelector.caretakerList);
  console.log(res);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [pageNo, setPageNo] = useState(0);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (res !== null) {
      let list = res?.result?.map(item => {
        return {
          name: item.result.userName,
          contact: item.result.contact,
        };
      });

      setData([...data, ...list]);
    }
  }, [res]);

  useEffect(() => {
    if (isFocused) {
      // setIsLoading(true);
      dispatch(caretakerRequestRequest(pageNo));
    }
  }, [pageNo, isFocused]);

  const onEnd = () => {
    setPageNo(pageNo + 1);
  };

  const renderLoader = () => {
    return res.result.length === 7 ? (
      <View style={{marginVertical: 26, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    ) : null;
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
                  {item.patientName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listSubTitle}>
                  {'Phone No. : ' + item.phoneNo}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View style={styles.buttonView}>
              <Button
                // onPress={() => {
                //   acceptrequest(item.cid);
                // }}
                title="Confirm"
                buttonStyle={styles.confirmButton}
                color="#4267B2"></Button>
              <View style={styles.space} />
              <Button
                // onPress={() => {
                //   deletereq(item.cid);
                // }}
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
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      {data.length === 0 ? (
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
            source={require('../../../assets/images/nocaretakers.jpg')}
          />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={fetchcaretakerreq}></RefreshControl>
          }
          data={data}
          renderItem={renderItem}
          numColumns={1}
          keyExtractor={item => item.contact}
          onEndReached={onEnd}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
        />
      )}
    </View>
  );
};

export default CareTakerRequest;
