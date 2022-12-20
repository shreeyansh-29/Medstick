import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {
  myPatientsClear,
  myPatientsRequest,
} from '../../../redux/action/patients/myPatientsAction';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPallete} from '../../../components/atoms/colorPallete';
import NoInternet from '../../../components/atoms/noInternet';
import SubHeader from '../../../components/molecules/headers/subHeader';

const MyPatients = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.myPatients);
  const connected = useSelector(state => state.internetConnectivity?.data);
  const [pageNo, setPageNo] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  useEffect(() => {
    pageNo === 0 ? dispatch(myPatientsRequest(pageNo)) : null;
  }, []);

  useEffect(() => {
    if (res?.data !== null && res.data.length !== 0) {
      console.log(res?.data);
      setMyPatients([...myPatients, ...res.data]);
      dispatch(myPatientsClear());
    }
  }, [res]);

  const onEnd = () => {
    console.log('hora hai');
    let a = pageNo + 1;
    if (myPatients?.length % 8 === 0 && a !== 0 && res?.length !== 0) {
      dispatch(myPatientsRequest(a));
      setPageNo(a);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.top}
        onPress={() => {
          navigation.navigate('PatientProfile', {profile: item});
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
      <SubHeader navigation={navigation} title={'My Patients'} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {myPatients.length === 0 ? (
            <View style={styles.imgView}>
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
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() =>
                setOnEndReachedCalledDuringMomentum(false)
              }
              keyExtractor={(item, index) => index.toString()}
              onEndReached={({distanceFromEnd}) => {
                console.log(distanceFromEnd);
                if (!onEndReachedCalledDuringMomentum) {
                  onEnd();
                  setOnEndReachedCalledDuringMomentum(true);
                }
              }}
              style={{backgroundColor: 'yellow'}}
              // refreshControl={
              //   <RefreshControl
              //     onRefresh={() => {
              //       let a = pageNo + 1;
              //       dispatch(myCaretakerRequest(a));
              //       setPageNo(a);
              //       setIsLoading(true);
              //       setCaretaker([]);
              //     }}
              //     refreshing={refresh}
              //   />
              // }
            />
          )}

          {connected ? (
            <View style={styles.button}>
              <AddButton
                text="Caretaker"
                routeName={'SearchScreen'}
                navigation={navigation}
                styles={styles.addBtn}
              />
            </View>
          ) : (
            <NoInternet />
          )}
        </>
      )}
    </View>
  );
};

export default MyPatients;
