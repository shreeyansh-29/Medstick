import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import Title from '../../atoms/title';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../atoms/appIcon';
import BellIcon from '../bellIcon';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';

const MainHeader = ({title, navigation, download}) => {
  const load = useSelector(state => state.userInfo?.data);

  return (
    <View style={styles.headerItem}>
      <AppIcon />
      <View style={styles.header}>
        <Title title={title} />
      </View>
      {title !== 'Medstick' ? null : <BellIcon navigation={navigation} />}
      {/* {title !== 'Report' ? null : (
        <>
          {load ? (
            <>
              <View style={styles.bellIcon}>
                <TouchableOpacity
                  onPress={download}
                  activeOpacity={1}
                  style={{padding: 2}}>
                  <FontAwesomeIcon
                    icon={faDownload}
                    color={'white'}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </>
      )} */}
    </View>
  );
};

export default MainHeader;
