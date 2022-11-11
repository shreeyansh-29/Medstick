import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {myCaretakerRequest} from '../../../redux/action/caretaker/myCaretakerAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPalette} from '../../../components/atoms/colorPalette';

const MyCareTaker = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.myCaretaker);
  const [pageNo, setPageNo] = useState(0);
  const [caretaker, setCaretaker] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (res?.data !== null) {
      setCaretaker([...res.data]);
    } else if (res?.data === null) {
      setCaretaker([]);
    }
  }, [res]);

  useEffect(() => {
    dispatch(myCaretakerRequest(pageNo));
  }, []);

  // const fetchCaretaker = () => {
  //   dispatch(myCaretakerRequest(pageNo));
  // };

  // const loadMoreItem = () => {
  //   if (res?.data?.length === 7) {
  //     let a = pageNo + 1;
  //     dispatch(myCaretakerRequest(a));
  //     setPageNo(a);
  //   }
  // };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
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
      {res?.isLoading ? (
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
              // onEndReached={loadMoreItem}
              // onEndReachedThreshold={0.5}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={1}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(myCaretakerRequest(pageNo));
                    setRefresh(false);
                  }}
                />
              }
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
