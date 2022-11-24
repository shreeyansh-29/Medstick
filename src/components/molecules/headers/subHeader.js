import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {styles} from '../../../styles/homeScreenStyles/subHeaderStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../atoms/colorPalette';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AddAppointment from '../../atoms/addAppointment';
import ShareButton from '../../atoms/shareButton';
import EditButton from '../../atoms/editButton';
import DownloadButton from '../../atoms/downloadButton';
import DeletePrescription from '../../atoms/deletePrescription';

const SubHeader = ({
  title,
  navigation,
  download,
  options,
  routeName,
  notes,
  deleteBtn,
  deletePrescription,
  prescriptionId,
}) => {
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
      {title !== 'Add Prescription' ? null : (
        <DeletePrescription
          deleteBtn={deleteBtn}
          deletePrescription={deletePrescription}
          prescriptionId={prescriptionId}
        />
      )}
    </View>
  );
};

export default SubHeader;
