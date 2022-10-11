import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';
import {useDispatch, useSelector} from 'react-redux';
import {myPrescriptionsRequest} from '../../redux/action/otherScreenAction/prescriptionsAction';
import Loader from '../../components/atoms/loader';
import * as Animatable from 'react-native-animatable';
import {styles} from '../../styles/otherScreensStyles/prescriptionsStyles';
import CustomImage from '../../components/atoms/customImage';

const Prescriptions = ({navigation}) => {
  const [myPrescriptions, setMyPrescriptions] = useState([]);
  const res = useSelector(state => state.myPrescriptions);
  const loading = useSelector(state => state.myPrescriptions?.isLoading);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myPrescriptionsRequest(currentPage));
    setIsLoading(true);
  }, [currentPage]);

  useEffect(() => {
    setIsLoading(false);
    if (res?.data !== null) {
      setMyPrescriptions(res?.data.result);
    }
  }, [res]);

  const RenderLoader = () => {
    return isLoading ? (
      <View style={{marginVertical: 26, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    ) : null;
  };

  const onEnd = () => {
    setCurrentPage(currentPage + 1);
  };

  const RenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ViewPrescription', {item: item});
        }}
        activeOpacity={1}
        style={styles.card}>
        <View style={styles.imgCont}>
          <Image
            resizeMode="stretch"
            styles={styles.img}
            source={require('../../assets/images/pres.jpeg')}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>{item.doctorName}</Text>
          <Text>{item.contact}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SubHeader title={'Prescriptions'} navigation={navigation} />

      {loading ? (
        <Loader />
      ) : (
        <>
          {myPrescriptions.length === 0 ? (
            <View style={styles.noPrescription}>
              <CustomImage
                resizeMode="contain"
                styles={{width: '80%'}}
                source={require('../../assets/images/noPrescriptions.png')}
              />
            </View>
          ) : (
            <View style={styles.flatlistView}>
              <FlatList
                style={styles.flatList}
                data={myPrescriptions}
                renderItem={RenderItem}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                // onEndReached={onEnd}
                // onEndReachedThreshold={0}
                // ListFooterComponent={RenderLoader}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Prescriptions;
