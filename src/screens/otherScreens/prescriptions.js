import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../components/molecules/headers/subHeader';
import {colorPallete} from '../../components/atoms/colorPalette';
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
import {faSquareCheck} from '@fortawesome/free-regular-svg-icons';

const Prescriptions = ({navigation}) => {
  const [myPrescriptions, setMyPrescriptions] = useState([]);
  const [prescriptionId, setPrescriptionId] = useState('');
  const [showLoader, setShowLoader] = useState(true);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let flag = true;
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 1500);
    return () => {
      false;
    };
  }, [showLoader]);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }

    return () => {
      false;
    };
  }, [isFocused]);

  const fetchData = () => {
    setRefresh(false);
    getPrescription().then(data => {
      if (data !== null && data.length !== 0) {
        setMyPrescriptions(data);
      } else {
        setMyPrescriptions([]);
      }
    });
  };

  const RenderItem = ({item, index}) => {
    return (
      <Animatable.View animation="zoomIn" duration={400} delay={index * 200}>
        <TouchableOpacity
          activeOpacity={0.5}
          onLongPress={() => {
            if (prescriptionId !== item?.prescriptionId) {
              //   setPrescriptionId('');
              //   setDeleteBtn(false);
              // } else {
              setPrescriptionId(item?.prescriptionId);
              setDeleteBtn(true);
            }
          }}
          onPress={() => {
            setPrescriptionId('');
            setDeleteBtn(false);
          }}>
          <View style={styles.top}>
            <ListItem
              style={styles.list}
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>
              {prescriptionId === item?.prescriptionId ? (
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  size={20}
                  color={colorPallete.mainColor}
                />
              ) : null}
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

              {prescriptionId === item.prescriptionId ? null : (
                <TouchableOpacity
                  activeOpacity={1}
                  style={{padding: 12}}
                  onPress={() => {
                    navigation.navigate('ViewPrescription', {
                      item: item,
                      flag: flag,
                    });
                  }}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size={18}
                    color={colorPallete.mainColor}
                  />
                </TouchableOpacity>
              )}
            </ListItem>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };
  return (
    <View style={styles.container}>
      <SubHeader
        title={'Prescriptions'}
        navigation={navigation}
        deleteBtn={deleteBtn}
        prescriptionId={prescriptionId}
        setPrescriptionList={setMyPrescriptions}
        setPrescriptionId={setPrescriptionId}
        setDeleteBtn={setDeleteBtn}
      />
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
              keyExtractor={item => item.prescriptionId}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  colors={[colorPallete.mainColor]}
                  onRefresh={() => {
                    setRefresh(true);
                    setMyPrescriptions([]);
                    fetchData();
                    setShowLoader(true);
                    setPrescriptionId('');
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

export default Prescriptions;
