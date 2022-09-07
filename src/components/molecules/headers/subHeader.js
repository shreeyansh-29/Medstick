import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import SubTitle from '../../atoms/subTitle';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const SubHeader = ({title, navigation}) => {
  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.pop();
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={20}
          color={colorPalette.appColor}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <SubTitle title={title} />
      </View>
    </View>
  );
};

export default SubHeader;
