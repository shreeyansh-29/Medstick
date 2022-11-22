import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {styles} from '../../../styles/homeScreenStyles/subHeaderStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AddAppointment from '../../atoms/addAppointment';
import {useDispatch} from 'react-redux';
import {notifyUserClear} from '../../../redux/action/patients/notifyUserAction';
import ShareButton from '../../atoms/shareButton';
import EditButton from '../../atoms/editButton';
import DownloadButton from '../../atoms/downloadButton';

const SubHeader = ({
  title,
  navigation,
  download,
  options,
  routeName,
  notes,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.pop();
          // if (title === 'Patient Medicine') {
          //   dispatch(notifyUserClear());
          // }
          if (title === 'Send Snap') {
            dispatch(sendSnapClear());
          }
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
        <AddAppointment navigation={navigation} routeName={routeName} notes={notes}/>
      )}
      {title !== 'Send Snap' ? null : <ShareButton options={options} />}
      {/* {title !== 'Patient Profile' ? null : (
        <EditButton navigation={navigation} />
      )} */}
    </View>
  );
};

export default SubHeader;
