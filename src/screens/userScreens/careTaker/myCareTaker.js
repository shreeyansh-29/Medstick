import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {
  myCaretakerClear,
  myCaretakerRequest,
} from '../../../redux/action/caretaker/myCaretakerAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPalette} from '../../../components/atoms/colorPalette';

const MyCareTaker = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.myCaretaker);
  const [pageNo, setPageNo] = useState(0);
  const [caretaker, setCaretaker] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    pageNo === 0 ? dispatch(myCaretakerRequest(pageNo)) : null;
  }, [pageNo]);

  useEffect(() => {
    if (res?.data !== null && res.data.length !== 0) {
      setCaretaker([...caretaker, ...res.data]);
      dispatch(myCaretakerClear());
    }
  }, [res]);

  const onEnd = () => {
    let a = pageNo + 1;
    if (caretaker?.length % 8 === 0 && a !== 0 && res?.length !== 0) {
      dispatch(myPatientsRequest(a));
    }
    setPageNo(a);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.top}
        onPress={() => {
          navigation.navigate('CareTakerProfile', {profile: item});
        }}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={item.userName} />
          <ListItem.Content>
            <ListItem.Title style={styles.patientName}>
              {item.userName}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {item.contact}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {caretaker.length === 0 ? (
            <View style={styles.imgView}>
              <CustomImage
                resizeMode="contain"
                styles={{width: '70%'}}
                source={require('../../../assets/images/nocaretakers.jpg')}
              />
            </View>
          ) : (
            <FlatList
              data={caretaker}
              renderItem={renderItem}
              onEndReached={onEnd}
              onEndReachedThreshold={0.01}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              // refreshControl={
              //   <RefreshControl
              //     colors={[colorPalette.mainColor]}
              //     tintColor={[colorPalette.mainColor]}
              //     refreshing={refresh}
              //     onRefresh={() => {
              //       dispatch(myCaretakerClear());
              //       setRefresh(false);
              //       setPageNo(0);
              //       setCaretaker([]);
              //     }}
              //   />
              // }
            />
          )}

          <View style={styles.button}>
            <AddButton
              text="Patient"
              routeName={'SearchScreen'}
              navigation={navigation}
              styles={styles.addBtn}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default MyCareTaker;
