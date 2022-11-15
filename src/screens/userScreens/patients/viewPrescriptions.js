import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/atoms/loader';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {myPrescriptionsRequest} from '../../../redux/action/otherScreenAction/prescriptionsAction';
import CustomImage from '../../../components/atoms/customImage';
import * as Animatable from 'react-native-animatable';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native';
import {style} from '../../../styles/patientStyles/viewPrescriptionStyles';

const ViewPrescriptions = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [precriptions, setPrecriptions] = useState([]);
  const res = useSelector(state => state.myPrescriptions);
  const loading = useSelector(state => state.myPrescriptions?.isLoading);
  const Id = route?.params?.id;
  const [refresh, setRefresh] = useState(false);
  let currentPage = 0;

  useEffect(() => {
    if (res?.data !== null) {
      setPrecriptions(res?.data);
    }
  }, [res]);

  useEffect(() => {
    dispatch(myPrescriptionsRequest({currentPage, Id}));
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomInUp" duration={400} delay={index * 400}>
        <View style={style.top}>
          <ListItem
            style={style.list}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}>
            <UserAvatar size={60} name={`${item.doctorName}`} />
            <ListItem.Content>
              <ListItem.Title style={style.patientName}>
                <Text style={style.font}>Doctor Name: </Text>
                {`${item.doctorName}`}
              </ListItem.Title>
              <ListItem.Subtitle style={style.subtitle}>
                <Text style={style.font}>Contact No: </Text>
                {item.contact}
              </ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
              style={style.btn}
              onPress={() => {
                navigation.navigate('ViewPrescription', {item: item});
              }}>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={16}
                color={colorPalette.mainColor}
              />
            </TouchableOpacity>
          </ListItem>
        </View>
      </Animatable.View>
    );
  };

  return (
    <View style={style.mainCont}>
      <SubHeader navigation={navigation} title={'Patient Precription'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {precriptions?.length === 0 ? (
            <View style={style.imgCont}>
              <CustomImage
                resizeMode="contain"
                source={require('../../../assets/images/nopatients.png')}
                styles={{width: '70%'}}
              />
            </View>
          ) : (
            <FlatList
              data={precriptions}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                  colors={[colorPalette.mainColor]}
                  tintColor={[colorPalette.mainColor]}
                  refreshing={refresh}
                  onRefresh={() => {
                    setRefresh(false);
                    dispatch(myPrescriptionsRequest({currentPage, Id}));
                  }}
                />
              }
            />
          )}
        </>
      )}
    </View>
  );
};

export default ViewPrescriptions;
