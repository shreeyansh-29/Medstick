import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import { Card, List } from 'react-native-paper';
import { Avatar, ListItem } from 'react-native-elements';
import { faClock, faPills, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colorPalette } from '../../../components/atoms/colorPalette';
import {
  horizontalScale,
  verticalScale,
} from '../../../components/atoms/constant';
import Styles from "../../../styles/medicinePanelStyles/medicinePanelStyles"
import { medicineListRequest } from '../../../redux/action/userMedicine/medicineListAction';

const MedicinePanel = ({ navigation }) => {
  const medicines = [
    { name: 'Paracetamol', type: 'Tablet', power: '600 mg', status: 0 },
    { name: 'Triohale', type: 'Inhaler', power: '5 dose', status: 1 },
    { name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1 },
  ];
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const getMedicine = () =>{
    fetch("https://e9d6-106-51-81-179.in.ngrok.io")
    .then((res)=>res.json())
    .then(resJson =>{
      console.log('data',resJson)
      setData(resJson);
    }).catch(e=>{console.log(e)})
  }
  useEffect(()=>{
    getMedicine();
  },[])



  const renderItem = ({ item }) => {
    return (
      <>
        <Animatable.View animation="zoomInUp" duration={400}>
          <Card style={Styles.card}>
            <View style={Styles.listView}>
              <ListItem style={Styles.list}>
                <ListItem.Content>
                  <View style={Styles.avatarView}>
                    <FontAwesomeIcon
                      icon={faPills}
                      size={36}
                      color={colorPalette.mainColor}
                      style={{
                        marginTop: verticalScale(6),
                        marginRight: horizontalScale(6),
                      }}
                    />
                    <View style={Styles.medNameView}>
                      <ListItem.Title style={Styles.medName}>
                        {item.name}
                      </ListItem.Title>
                      <ListItem.Subtitle>{item.type}</ListItem.Subtitle>
                      <ListItem.Subtitle>{item.power}</ListItem.Subtitle>
                    </View>
                  </View>
                </ListItem.Content>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={Styles.rem}
                    onPress={() =>
                      navigation.navigate("AddRemainder", {id: item.index})
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
                          onPress: () => deleteitem(item.user_id),
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
        </Animatable.View>
        {/* <View>
          <Text style={fontStyle.header1}>{item.name}</Text>
          <Text style={fontStyle.header1}>{item.type}</Text>
          <Text>{item.Power}</Text>
        </View> */}
      </>
    );
  };

  return (
    <View style={Styles.container}>
      <MainHeader title={'Medicine'} />
      {medicines.length === 0 ? (
        <View style={Styles.lottie}>
          <LottieView
            style={{ width: '60%' }}
            speed={0.8}
            source={require('../../../assets/animation/noMedicine2.json')}
            progress={progress}
          />
        </View>
      ) : (
        <View style={Styles.flatlist}>
          <FlatList
            data={medicines}
            renderItem={renderItem}
            // initialNumToRender={10}
            numColumns={1}
          />
        </View>
      )}
    </View>
  );
};

export default MedicinePanel;
