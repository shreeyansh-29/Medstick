import {
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const MyCareTaker = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    {name: 'Manish Raj', phoneNo: '9695072068'},
    {name: 'Devanshu', phoneNo: '8391812091'},
    {name: 'Shiva', phoneNo: '8391812091'},
    // {name: 'Yatin Tripathi', phoneNo: '8391812091'},
    // {name: 'Vinay Soni', phoneNo: '8391812091'},
    // {name: 'Abhi Singh', phoneNo: '8391812091'},
    // {name: 'Gopal ', phoneNo: '8391812091'},
  ]);

  const fetchPatients = () => {};

  const renderItem = ({item}) => {
    return (
      // onPress={() => {
      //   navigation.navigate('Patient Profile', {
      //     user_id: item.patientId,
      //   });
      // }}
      // style={styles.card}

      <TouchableOpacity style={styles.top}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={item.name} />
          <ListItem.Content>
            <ListItem.Title style={styles.patientName}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle style={{marginLeft:3}}>{item.phoneNo}</ListItem.Subtitle>
          </ListItem.Content>

          {/* <TouchableOpacity onPress={() => {}} style={styles.touch}>
            <View style={styles.icon}>
              <FontAwesomeIcon icon={faAngleRight} color={'black'} size={25} />
            </View>
          </TouchableOpacity> */}
        </ListItem>
      </TouchableOpacity>
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
          data={data}
          renderItem={renderItem}
          // initialNumToRender={10}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPatients} />
          }
        />
      )}

      <View style={{position: 'absolute', bottom: 20, right: 16}}>
        <AddButton
          routeName={'SearchScreen'}
          navigation={navigation}
          styles={{height: 84, width: 84}}
        />
      </View>
    </View>
  );
};

export default MyCareTaker;
