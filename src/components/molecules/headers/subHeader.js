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
import EditButton from '../../atoms/editButton';

const SubHeader = ({
  title,
  navigation,
  download,
  options,
  routeName,
  notes,
  deleteBtn,
  prescriptionId,
  setPrescriptionList,
  setPrescriptionId,
  setDeleteBtn,
  edit,
  setEdit,
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
      {title !== 'Doctor Prescription' ? null : (
        <EditButton navigation={navigation} edit={edit} setEdit={setEdit} />
      )}
      {title !== 'Add Prescription' ? null : (
        <DeletePrescription
          deleteBtn={deleteBtn}
          prescriptionId={prescriptionId}
          setPrescriptionList={setPrescriptionList}
          setPrescriptionId={setPrescriptionId}
          setDeleteBtn={setDeleteBtn}
        />
      )}
    </View>
  );
};

export default SubHeader;
