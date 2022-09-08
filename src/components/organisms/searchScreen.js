import {View} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../molecules/headers/subHeader';
import {TextInput} from 'react-native-paper';
import {colorPalette} from '../atoms/colorPalette';

const SearchScreen = ({navigation}) => {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1}}>
      <SubHeader title={'Search'} navigation={navigation} />

      <TextInput
        style={{marginHorizontal: 20,marginTop: 10}}
        id="name"
        label="Search Name"
        value={text}
        mode="outlined"
        onChangeText={text => setText(text)}
        outlineColor="#008A81"
        activeOutlineColor="#008A81"
      />
      {/* <TextInput
          placeholder="Search"
          value={text}
          onChangeText={text => setText(text)}
          activeOutlineColor={colorPalette.mainColor}
          activeUnderlineColor={colorPalette.mainColor}
        /> */}
    </View>
  );
};

export default SearchScreen;
