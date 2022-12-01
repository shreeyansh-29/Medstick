import {View, TouchableOpacity, FlatList, RefreshControl} from 'react-native';
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
import {useIsFocused} from '@react-navigation/native';

const MyPatients = ({navigation}) => {
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const res = useSelector(state => state.myPatients);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (res?.data !== null) {
      setMyPatients(res.data);
    }
  }, [res]);

  useEffect(() => {
    if (isFocused) {
      dispatch(myPatientsRequest(pageNo));
    }
  }, [isFocused]);

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
      {res?.isLoading ? (
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
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    dispatch(myPatientsRequest(pageNo));
                    setRefresh(false);
                  }}
                />
              }
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
