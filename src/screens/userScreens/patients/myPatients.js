import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {styles} from '../../../styles/patientStyles/myPatientsStyles';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {myPatientsRequest} from '../../../redux/action/patients/myPatientsAction';

const MyPatients = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [pageNo, setPageNo] = useState(0);
  const [myPatients, setMyPatients] = useState([]);
  const res = useSelector(state => state.myPatients.data);
  const loading = useSelector(state => state.myPatients.isLoading);

  useEffect(() => {
    if (res !== null) {
      let list = res?.result?.map(item => {
        return {
          name: item.userName,
          contact: item.contact,
          profile: item,
        };
      });
      setMyPatients([...myPatients, ...list]);
    }
  }, [res]);

  useEffect(() => {
    if (isFocused) dispatch(myPatientsRequest(pageNo));
  }, [pageNo, isFocused]);

  const onEnd = () => {
    setPageNo(pageNo + 1);
  };

  const renderLoader = () => {
    return res?.result.length === 7 ? (
      <View style={{marginVertical: 26, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    ) : null;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.top}
        onPress={() => {
          navigation.navigate('PatientProfile', {
            profile: myPatients,
          });
        }}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={`${item.name}`} />
          <ListItem.Content>
            <ListItem.Title style={styles.patientName}>
              {`${item.name}`}
            </ListItem.Title>
            <ListItem.Subtitle style={{marginLeft: 3}}>
              {`${item.contact}`}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      {myPatients.length === 0 ? (
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
            source={require('../../../assets/images/nopatients.png')}
          />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={myPatients}
          renderItem={renderItem}
          keyExtractor={item => item.contact}
          numColumns={1}
          onEndReached={onEnd}
          // ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
        />
      )}
      <View style={{position: 'absolute', bottom: 20, right: 16}}>
        <AddButton
          text={''}
          routeName={'SearchScreen'}
          navigation={navigation}
          styles={{height: 84, width: 84}}
        />
      </View>
    </View>
  );
};

export default MyPatients;
