import {
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {faClock, faPills, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {useDispatch, useSelector} from 'react-redux';
import {loadMedicineList} from '../../../redux/action/userMedicine/medicineListAction';
import {useIsFocused} from '@react-navigation/native';
import {deleteMedicineRequest} from '../../../redux/action/userMedicine/deleteMedicine';
import Loader from '../../../components/atoms/loader';

const MedicinePanel = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [medicines, setMedicines] = useState([]);
  const res = useSelector(state => state.medicineList);
  const loading = useSelector(
    state => state.medicineList?.loading?.medicineListLoader,
  );
  const res1 = useSelector(state => state.deleteMedicine);

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (res?.data !== null) {
      setMedicines(res?.data?.result);
    }
  }, [res]);

  useEffect(() => {
    if (isFocused) {
      dispatch(loadMedicineList());
    }
  }, [isFocused]);

  const deleteMedicine = userMedicineId => {
    dispatch(deleteMedicineRequest(userMedicineId));
    setTimeout(() => {
      dispatch(loadMedicineList());
    }, 300);
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Animatable.View animation="zoomInUp" duration={400}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('MedicineList', {data: medicines});
            }}
            >
            <Card style={Styles.card}>
              <View style={Styles.listView}>
                <ListItem style={Styles.list}>
                  <ListItem.Content>
                    <View style={Styles.avatarView}>
                      <FontAwesomeIcon
                        icon={faPills}
                        size={36}
                        color={colorPalette.mainColor}
                      />
                      <View style={Styles.medNameView}>
                        <ListItem.Title style={Styles.medName}>
                          {item.medicineName}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Type: </Text>
                          {item.dosageQuantity}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Dosage: </Text>
                          {item.dosageUnit}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                          <Text style={{color: 'black'}}>Stock: </Text>
                          {item.stock}
                        </ListItem.Subtitle>
                      </View>
                    </View>
                  </ListItem.Content>
                  <View style={Styles.icon}>
                    <TouchableOpacity
                      style={Styles.rem}
                      onPress={() =>
                        navigation.navigate('Add Reminder', {id: item.index})
                      }>
                      <FontAwesomeIcon
                        icon={faClock}
                        color={colorPalette.mainColor}
                        size={24}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('Delete it!', 'Sure you want delete it', [
                          {
                            text: 'Delete',
                            onPress: () => deleteMedicine(item.userMedicineId),
                          },
                          {
                            text: 'Cancel',
                          },
                        ]);
                      }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        color={colorPalette.mainColor}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                </ListItem>
              </View>
            </Card>
          </TouchableOpacity>
        </Animatable.View>
      </>
    );
  };

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.background} />
        <MainHeader title={'Medicine'} />
        {loading ? (
          <Loader />
        ) : (
          <>
            {medicines === null ? (
              <View style={Styles.lottie}>
                <LottieView
                  style={Styles.lottieView}
                  speed={0.8}
                  source={require('../../../assets/animation/noMed1.json')}
                  progress={progress}
                />
              </View>
            ) : (
              <>
                <FlatList
                  data={medicines}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default MedicinePanel;
