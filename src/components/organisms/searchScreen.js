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
      <View>
        <TextInput
          placeholder="Search"
          value={text}
          onChangeText={text => setText(text)}
          activeOutlineColor={colorPalette.mainColor}
          activeUnderlineColor={colorPalette.mainColor}
        />
      </View>
    </View>
  );
};

export default SearchScreen;
