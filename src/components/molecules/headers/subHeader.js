import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import SubTitle from '../../atoms/subTitle';
import {styles} from '../../../styles/homeScreenStyles/headerStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import DownloadButton from '../../atoms/downloadButton';
import {useDispatch} from 'react-redux';
import {notifyUserClear} from '../../../redux/action/patients/notifyUserAction';
import ShareButton from '../../atoms/shareButton';

const SubHeader = ({title, navigation, download, options}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.pop();
          if (title === 'Patient Medicine') {
            dispatch(notifyUserClear());
          }
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={20}
          color={colorPalette.basicColor}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <SubTitle title={title} />
      </View>
      {title !== 'Medicine Report' ? (
        <View style={styles.appIcon}></View>
      ) : (
        <DownloadButton navigation={navigation} download={download} />
      )}
      {title !== 'Send Snap' ? (
        <View style={styles.appIcon}></View>
      ) : (
        <ShareButton options={options} />
      )}
    </View>
  );
};

export default SubHeader;
