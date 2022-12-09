import {View, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {styles} from '../../../styles/patientStyles/myPatientsStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  myPatientsClear,
  myPatientsRequest,
} from '../../../redux/action/patients/myPatientsAction';
import CustomImage from '../../../components/atoms/customImage';
import Loader from '../../../components/atoms/loader';
import {colorPallete} from '../../../components/atoms/colorPallete';

const MyPatients = ({
  navigation,
  myPatients,
  setMyPatients,
  pageNo,
  setPageNo,
}) => {
  const dispatch = useDispatch();
  // const [pageNo, setPageNo] = useState(0);
  // const [myPatients, setMyPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const res = useSelector(state => state.myPatients);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    pageNo === 0 ? dispatch(myPatientsRequest(pageNo)) : null;
  }, [pageNo]);

  useEffect(() => {
    if (res?.data !== null) {
      setMyPatients([...myPatients, ...res.data]);
      dispatch(myPatientsClear());
    }
  }, [res]);

  const onEnd = () => {
    let a = pageNo + 1;
    if (myPatients?.length % 8 === 0 && a !== 0 && res?.length !== 0) {
      dispatch(myPatientsRequest(a));
    }
    setPageNo(a);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        key={item.contact}
        activeOpacity={1}
        style={styles.top}
        onPress={() => {
          navigation.navigate('PatientProfile', {profile: item});
        }}>
        <ListItem
          key={item.contact + '1'}
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
    <View style={styles.mainCont}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {myPatients?.length === 0 ? (
            <View style={styles.imgCont}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../../assets/images/nopatients.png')}
              />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={myPatients}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={onEnd}
              onEndReachedThreshold={0.01}
              // refreshControl={
              //   <RefreshControl
              //     colors={[colorPallete.mainColor]}
              //     tintColor={[colorPallete.mainColor]}
              //     refreshing={refresh}
              //     onRefresh={() => {
              //       dispatch(myPatientsClear());
              //       setRefresh(false);
              //       setPageNo(0);
              //       setMyPatients([]);
              //     }}
              //   />
              // }
            />
          )}
          <View style={styles.bottomView}>
            <AddButton
              text="Caretaker"
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

export default MyPatients;
