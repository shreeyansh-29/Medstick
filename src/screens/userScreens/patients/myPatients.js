import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {styles} from '../../../styles/patientStyles/myPatientsStyles';
import {useDispatch, useSelector} from 'react-redux';
import {myPatientsRequest} from '../../../redux/action/patients/myPatientsAction';
import CustomImage from '../../../components/atoms/customImage';
import Loader from '../../../components/atoms/loader';

const MyPatients = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const res = useSelector(state => state.myPatients);
  // console.log(res);
  const loading = useSelector(state => state.myPatients.isLoading);

  useEffect(() => {
    if (res?.data !== null) {
      setMyPatients([...res.data]);
    } else {
      setMyPatients([]);
    }
  }, [res]);

  useEffect(() => {
    dispatch(myPatientsRequest(pageNo));
  }, []);

  // const onEnd = () => {
  //   setPageNo(pageNo + 1);
  // };

  // const renderLoader = () => {
  //   return res?.result.length === 7 ? (
  //     <View style={{marginVertical: 26, alignItems: 'center'}}>
  //       <ActivityIndicator size="large" color={colorPalette.mainColor} />
  //     </View>
  //   ) : null;
  // };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.top}
        onPress={() => {
          navigation.navigate('PatientProfile', {
            profile: item,
          });
        }}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={`${item.userName}`} />
          <ListItem.Content>
            <ListItem.Title style={styles.patientName}>
              {`${item.userName}`}
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
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {myPatients.length === 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: colorPalette.basicColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CustomImage
                resizeMode="contain"
                styles={{width: '70%'}}
                source={require('../../../assets/images/nopatients.png')}
              />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={myPatients}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(myPatientsRequest(pageNo));
                    setRefresh(false);
                  }}
                />
              }
              // numColumns={1}
              // onEndReached={onEnd}
              // ListFooterComponent={renderLoader}
              // onEndReachedThreshold={0.5}
            />
          )}
          <View style={{position: 'absolute', bottom: 20, right: 16}}>
            <AddButton
              text="Caretaker"
              routeName={'SearchScreen'}
              navigation={navigation}
              styles={{height: 84, width: 84}}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default MyPatients;
