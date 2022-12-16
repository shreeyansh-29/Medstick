import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
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
import {colorPallete} from '../../../components/atoms/colorPalette';
import NoInternet from '../../../components/atoms/noInternet';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAdd,
  faPen,
  faUserFriends,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {useIsFocused} from '@react-navigation/native';

const MyPatients = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const res = useSelector(state => state.myPatients);
  const loading = useSelector(state => state.myPatients?.isLoading);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const [scrollEnd, setScrollEnd] = useState(true);
  const [showSpeedDial, setSpeedDial] = useState(null);
  const openSpeedDial = () => setSpeedDial(!showSpeedDial);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => {};
  // }, [isLoading]);

  useEffect(() => {
    if (isFocused) pageNo === 0 ? dispatch(myPatientsRequest(pageNo)) : null;

    return () => {};
  }, [pageNo, isFocused]);

  useEffect(() => {
    if (res?.data !== null) {
      setMyPatients([...myPatients, ...res.data]);
      dispatch(myPatientsClear());
    }
  }, [res]);

  const onEnd = () => {
    if (!scrollEnd) {
      setScrollEnd(true);
    } else {
      let a = pageNo + 1;
      if (myPatients?.length % 8 === 0 && a !== 0 && res?.length !== 0) {
        dispatch(myPatientsRequest(a));
        setPageNo(a);
      }
    }
  };

  const FabButton = ({onPress}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={{
          height: 50,
          width: 50,
          backgroundColor: colorPallete.mainColor,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {!showSpeedDial ? (
          <FontAwesomeIcon
            icon={faPen}
            color={colorPallete.basicColor}
            size={18}
          />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            color={colorPallete.basicColor}
            size={22}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={item.contact}
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
      <SubHeader title={'My Patients'} navigation={navigation} />
      {loading ? (
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
              keyExtractor={item => item.userId}
              onEndReached={onEnd}
              onEndReachedThreshold={0.01}
              onMomentumScrollBegin={() => {
                setScrollEnd(false);
              }}
            />
          )}
          {connected ? (
            <View style={Styles.container}>
              {showSpeedDial ? (
                <View style={Styles.speedView}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      borderWidth: 0.2,
                      padding: 10,
                      borderRadius: 50,
                      borderColor: 'grey',
                      marginBottom: 14,
                      backgroundColor: 'white',
                    }}
                    onPress={() => {
                      // setIsLoading(true);
                      // setMyPatients([]);
                      navigation.navigate('SearchScreen', {
                        sentBy: 'Caretaker',
                      });
                      setSpeedDial(false);
                    }}>
                    <FontAwesomeIcon
                      icon={faAdd}
                      color={colorPallete.mainColor}
                      size={24}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // setIsLoading(true);
                      // setMyPatients([]);
                      navigation.navigate('PatientRequest');
                      setSpeedDial(false);
                    }}
                    style={{
                      borderWidth: 0.2,
                      padding: 10,
                      borderRadius: 50,
                      borderColor: 'grey',
                      backgroundColor: 'white',
                    }}
                    activeOpacity={1}>
                    <FontAwesomeIcon
                      icon={faUserFriends}
                      color={colorPallete.mainColor}
                      size={24}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              <FabButton onPress={openSpeedDial} />
            </View>
          ) : (
            <NoInternet />
          )}
        </>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    bottom: 12,
    alignItems: 'center',
  },

  speedView: {
    alignItems: 'center',
    paddingVertical: 14,
  },
});

export default MyPatients;

{
  /* <AddButton
                text="Caretaker"
                routeName={'SearchScreen'}
                navigation={navigation}
                styles={styles.addBtn}
              /> */
}
