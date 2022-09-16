import {View, FlatList, Animated, TouchableOpacity, Alert} from 'react-native';
import React, {useRef, useEffect} from 'react';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {faClock, faPills, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';

const MedicinePanel = ({navigation}) => {
  const medicines = [
    {name: 'Paracetamol', type: 'Tablet', power: '600 mg', status: 0},
    {name: 'Triohale', type: 'Inhaler', power: '5 dose', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
    {name: 'Cofsils', type: 'Syrup', power: '30 ml', status: 1},
  ];
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = ({item}) => {
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
      </>
    );
  };

  return (
    <>
      <View style={Styles.container}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: colorPalette.mainColor,
            height: '50%',
            width: '200%',
            borderBottomEndRadius: 530,
            borderBottomStartRadius: 590,
            top: -140,
            right: -120,
          }}
        />
        <MainHeader title={'Medicine'} />
        {medicines.length === 0 ? (
          <View style={Styles.lottie}>
            <LottieView
              style={Styles.lottieView}
              speed={0.8}
              source={require('../../../assets/animation/noMedicine2.json')}
              progress={progress}
            />
          </View>
        ) : (
          <FlatList
            data={medicines}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

export default MedicinePanel;
