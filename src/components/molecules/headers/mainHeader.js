import {View} from 'react-native';
import React from 'react';
import Title from '../../atoms/title';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../atoms/appIcon';
import BellIcon from '../cameraIcon';

const MainHeader = ({title, navigation}) => {
  return (
    <View style={styles.headerItem}>
      <AppIcon />
      <View style={styles.header}>
        <Title title={title} />
      </View>
      {title === 'PROFILE' ? (
        <View style={styles.bellIcon}></View>
      ) : (
        <BellIcon navigation={navigation} />
      )}
    </View>
  );
};

export default MainHeader;
