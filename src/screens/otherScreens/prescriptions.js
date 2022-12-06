import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPalette} from '../../components/atoms/colorPalette';
import * as Animatable from 'react-native-animatable';
import {styles} from '../../styles/otherScreensStyles/prescriptionsStyles';
import CustomImage from '../../components/atoms/customImage';
import {useIsFocused} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';
import UserAvatar from 'react-native-user-avatar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {getPrescription} from '../../utils/storage';
import Loader from '../../components/atoms/loader';

const Prescriptions = ({navigation}) => {
  const [myPrescriptions, setMyPrescriptions] = useState([]);
  const isFocused = useIsFocused();
  const [showLoader, setShowLoader] = useState(true);
  let flag = true;

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => {
      false;
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      getPrescription().then(data => {
        if (data !== null && data.length !== 0) {
          setMyPrescriptions(data);
        } else {
          setMyPrescriptions([]);
        }
      });
    }
  }, [isFocused]);

  const RenderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 200}>
        <View style={styles.top}>
          <ListItem
            style={styles.list}
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}>
            <UserAvatar size={60} name={`${item.doctorName}`} />
            <ListItem.Content>
              <ListItem.Title style={styles.patientName} numberOfLines={1}>
                <Text style={styles.font}>Doctor Name: </Text>
                {`${item.doctorName}`}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                <Text style={styles.font}>Contact No: </Text>
                {item.contact}
              </ListItem.Subtitle>
            </ListItem.Content>
            <TouchableOpacity
              activeOpacity={1}
              style={{marginRight: 12}}
              onPress={() => {
                navigation.navigate('ViewPrescription', {
                  item: item,
                  flag: flag,
                });
              }}>
              <FontAwesomeIcon
                icon={faChevronRight}
                size={18}
                color={colorPalette.mainColor}
              />
            </TouchableOpacity>
          </ListItem>
        </View>
      </Animatable.View>
    );
  };
  return (
    <View style={styles.container}>
      <SubHeader title={'Prescriptions'} navigation={navigation} />
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {myPrescriptions.length === 0 ? (
            <View style={styles.noPrescription}>
              <CustomImage
                resizeMode="contain"
                styles={styles.img}
                source={require('../../assets/images/noPrescriptions.png')}
              />
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              data={myPrescriptions}
              renderItem={RenderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Prescriptions;
