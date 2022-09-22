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
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          outlineColor: colorPalette.mainColor,
        }}
        id="name"
        label="Search Name"
        value={text}
        mode="outlined"
        onChangeText={text => setText(text)}
        outlineColor={colorPalette.mainColor}
        activeOutlineColor={colorPalette.mainColor}
      />
    </View>
  );
};

export default SearchScreen;
