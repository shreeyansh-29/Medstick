import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {styles} from '../../../styles/homeScreenStyles/subHeaderStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AddAppointment from '../../atoms/addAppointment';
import ShareButton from '../../atoms/shareButton';
import DownloadButton from '../../atoms/downloadButton';

const SubHeader = ({
  title,
  navigation,
  download,
  options,
  routeName,
  notes,
}) => {
  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.backIcon}
        onPress={() => {
          navigation.pop();
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          size={20}
          color={colorPalette.basicColor}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.subHeaderFont}>{title}</Text>
      </View>
      {title !== 'Medicine Report' ? null : (
        <DownloadButton download={download} />
      )}
      {title !== 'Appointment Reminders' ? null : (
        <AddAppointment
          navigation={navigation}
          routeName={routeName}
          notes={notes}
        />
      )}
      {title !== 'Send Snap' ? null : <ShareButton options={options} />}
      {/* {title !== 'Patient Profile' ? null : (
        <EditButton navigation={navigation} />
      )} */}
    </View>
  );
};

export default SubHeader;
