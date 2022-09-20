import {
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';

const MyCareTaker = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    {name: 'Shreeyansh Singh', phoneNo: '9695072068'},
    {name: 'Devanshu', phoneNo: '8391812091'},
    {name: 'Shiva', phoneNo: '8391812091'},
  ]);

  const fetchPatients = () => {};

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.top}
        onPress={() => {
          navigation.navigate('CareTakerProfile');
        }}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={item.name} />
          <ListItem.Content>
            <ListItem.Title style={styles.patientName}>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {item.phoneNo}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <View style={styles.imgView}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../../assets/images/nocaretakers.jpg')}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchPatients} />
          }
        />
      )}

      <View style={styles.button}>
        <AddButton
          routeName={'SearchScreen'}
          navigation={navigation}
          styles={styles.addBtn}
        />
      </View>
    </View>
  );
};

export default MyCareTaker;
