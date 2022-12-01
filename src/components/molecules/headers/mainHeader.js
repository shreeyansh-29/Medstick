import {View} from 'react-native';
import React from 'react';
import Title from '../../atoms/title';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../atoms/appIcon';
import BellIcon from '../bellIcon';
import DownloadButton from '../../atoms/downloadButton';

const MainHeader = ({title, navigation, download}) => {
  return (
    <View style={styles.headerItem}>
      <AppIcon />
      <View style={styles.header}>
        <Title title={title} />
      </View>
      {title !== 'Medstick' ? (
        <View style={styles.appIcon}></View>
      ) : (
        <BellIcon navigation={navigation} />
      )}
      {/* {title !== 'Report' ? (
        <View style={styles.appIcon}></View>
      ) : (
        <DownloadButton
          navigation={navigation}
          title={'Report'}
          download={download}
        />
      )} */}
    </View>
  );
};

export default MainHeader;
