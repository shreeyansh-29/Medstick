import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {faXmarkCircle} from '@fortawesome/free-regular-svg-icons';
import {Icon, SearchBar} from 'react-native-elements';

const RenderModalView = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignSelf: 'flex-end', marginTop: 8, marginRight: 12}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // setSearchModal(false);
            // dispatch(searchMedicineClear());
            // setTempSearch([]);
          }}>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            size={26}
            color={colorPalette.mainColor}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10}}>
        <SearchBar
          platform="default"
          placeholder="Search Medicine"
          value={props.values.medicineName}
          onChangeText={props.handleChange('medicineName')}
          containerStyle={{
            backgroundColor: 'rbga(225,232,238,0)',
          }}
          inputContainerStyle={{
            borderRadius: 30,
            backgroundColor: '#EFF5F5',
            height: 50,
          }}
          inputStyle={{
            fontSize: 18,
            color: colorPalette.mainColor,
          }}
          lightTheme="true"
          placeholderTextColor={colorPalette.mainColor}
          clearIcon={{color: colorPalette.mainColor, size: 22}}
          searchIcon={
            <Icon
              size={22}
              name="search"
              type="font-awesome"
              color={colorPalette.mainColor}
              onPress={() => handleSubmit()}
              containerStyle={{marginLeft: 10}}
            />
          }
        />
      </View>
    </View>
  );
};

export default RenderModalView;
