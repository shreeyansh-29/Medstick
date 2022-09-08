import {View, Text, FlatList, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {styles} from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import {fontStyle} from '../../../styles/fontStyles';
import MainHeader from '../../../components/molecules/headers/mainHeader';
import LottieView from 'lottie-react-native';
import {colorPalette} from '../../../components/atoms/colorPalette';

const MedicinePanel = () => {
  // const medicines = [
  //   {name: 'Paracetamol', type: 'xjox', Power: '600mg'},
  //   {name: 'evil', type: 'bava', Power: '500mg'},
  //   {name: 'Pain killer', type: 'bava', Power: '300mg'},
  // ];
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorPalette.basicColor,
      }}>
      <MainHeader title={'MEDICINES'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          style={{width: '60%'}}
          speed={0.8}
          source={require('../../../assets/animation/noMedicine2.json')}
          autoPlay
          loop
        />
      </View>
      {/* <View style={styles.flatlistL}>
        <FlatList
          data={medicines}
          renderItem={Element => {
            return (
              <View>
                <Text style={fontStyle.header1}>{Element.item.name}</Text>
                <Text style={fontStyle.header1}>{Element.item.type}</Text>
                <Text>{Element.item.Power}</Text>
              </View>
            );
          }}
          initialNumToRender={10}
          numColumns={1}
        />
      </View> */}
    </View>
  );
};

export default MedicinePanel;
