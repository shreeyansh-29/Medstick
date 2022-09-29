import {View, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddButton from '../../../components/atoms/addButton';
import {styles} from '../../../styles/careTakerStyles/myCareTakerStyles';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {useDispatch, useSelector} from 'react-redux';
import {caretakerRequest} from '../../../redux/action/caretakerAction/myCaretakerAction';
import {useIsFocused} from '@react-navigation/native';
import { myCaretakerSelector } from '../../../constants/Selector/myCaretakerSelector';

const MyCareTaker = ({navigation}) => {
  const res = useSelector(myCaretakerSelector.caretaker);
  console.log(res);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [pageNo, setPageNo] = useState(0);
  const [myCaretaker, setMyCaretaker] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (res !== null) {
      setMyPatients([...myCaretaker, ...res.result]);
      setIsLoading(false);
    }
  }, [res]);

  const onEnd = () => {
    setPageNo(pageNo + 1);
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={{marginVertical: 26, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    ) : null;
  };

  useEffect(() => {
    dispatch(myCaretakerRequest(pageNo));
    setIsLoading(true);
  }, [pageNo]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.top}
        onPress={() => {
          navigation.navigate('CareTakerProfile',{
            profile:item.userDetails.picPath,
          });
        }}>
        <ListItem
          style={styles.list}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <UserAvatar size={60} name={item.name} />
          <ListItem.Content>
            <ListItem.Title key={item} style={styles.patientName}>
              {item.result?.userName}
            </ListItem.Title>
            <ListItem.Subtitle key={item} style={styles.subtitle}>
              {item.contact}
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
          keyExtractor={item => item.contact}
          onEndReached={onEnd}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0}
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
