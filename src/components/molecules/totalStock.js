import {View, Text, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-paper';
import Styles from '../../styles/medicinePanelStyles/medicinePanelStyles';
import {colorPalette} from '../atoms/colorPalette';

const TotalStock = props => {
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
  const [stock, setStock] = useState(1);
  const valueChangePlus = () => {
    var addValue = Number(stock);
    addValue = addValue + 1;
    setStock(addValue.toString());
  };
  props.onChange(stock);

  const valueChangeMinus = () => {
    var subValue = Number(stock);
    if (subValue == 0) {
      showAlert();
    } else {
      subValue = subValue - 1;
    }
    setStock(subValue.toString());
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => valueChangeMinus()}
        style={Styles.addbutton}>
        <Feather
          size={30}
          name="minus"
          color={colorPalette.mainColor}
          Stroke
          width={0.5}
        />
      </TouchableOpacity>
      <TextInput
        id="name"
        style={Styles.stockbox}
        label="units"
        value={stock}
        mode="outlined"
        keyboardType="numeric"
        onChangeText={stock => setStock(Number(stock))}
        outlineColor="#02aba6"
        activeOutlineColor="#02aba6"
      />
      <TouchableOpacity
        onPress={() => valueChangePlus()}
        style={Styles.addbutton}>
        <Feather size={30} name="plus" color={colorPalette.mainColor} />
      </TouchableOpacity>
    </View>
  );
};

export default TotalStock;
