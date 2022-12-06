import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Title from '../../atoms/title';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import AppIcon from '../../atoms/appIcon';
import BellIcon from '../bellIcon';
import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const MainHeader = ({title, navigation, download}) => {
  const connected = useSelector(state => state.internetConnectivity?.data);
  const [load, setLoad] = useState(false);

  const getUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    if (user !== null) setLoad(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.headerItem}>
      <AppIcon />
      <View style={styles.header}>
        <Title title={title} />
      </View>
      {title !== 'Medstick' ? null : <BellIcon navigation={navigation} />}
      {title !== 'Report' ? null : (
        <>
          {connected && load ? (
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
      )}
    </View>
  );
};

export default MainHeader;
