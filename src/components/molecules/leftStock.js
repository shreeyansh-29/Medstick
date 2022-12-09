import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {colorPallete} from '../atoms/colorPallete';
import {TextInput} from 'react-native-paper';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';

const LeftStock = props => {
  const showAlert = () => {
    Alert.alert(
      'Warning',
      'Stocks cannot be less then 0',
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };
  const [remaingStock, setRemainingStock] = useState('1');

  props.onChange(remaingStock);
  const valueChangePlus = () => {
    var addValue = Number(remaingStock);
    addValue = addValue + 1;
    setRemainingStock(addValue.toString());
  };

  const valueChangeMinus = () => {
    var subValue = Number(remaingStock);
    if (subValue == 0) {
      showAlert();
    } else {
      subValue = subValue - 1;
    }
    setRemainingStock(subValue.toString());
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => valueChangeMinus()}
        style={Styles.addbutton}>
        <Feather
          size={30}
          name="minus"
          color={colorPallete.mainColor}
          Stroke
          width={0.5}
        />
      </TouchableOpacity>
      <TextInput
        id="name"
        style={{width: '40%'}}
        label="units"
        value={remaingStock}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={remaingStock => setRemainingStock(Number(remaingStock))}
        outlineColor="#02aba6"
        activeOutlineColor="#02aba6"
      />
      <TouchableOpacity
        onPress={() => valueChangePlus()}
        style={Styles.addbutton}>
        <Feather size={30} name="plus" color={colorPallete.mainColor} />
      </TouchableOpacity>
    </View>
  );
};

export default LeftStock;
