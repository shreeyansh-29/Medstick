import {View, Alert} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/homeScreenStyles/subHeaderStyles';
import {
  getMedicine,
  getPrescription,
  savePrescription,
} from '../../utils/storage';
import {CustomAlert} from '../atoms/customAlert';

const DeletePrescription = ({
  deleteBtn,
  prescriptionId,
  setPrescriptionList,
  setPrescriptionId,
  setDeleteBtn,
}) => {
  const showAlert = () => {
    CustomAlert({
      text1: "Can't delete this prescription",
      text2: 'Added in a medicine',
      onPress: () => {
        setPrescriptionId('');
        setDeleteBtn(false);
      },
    });
  };

  const refresh = () => {
    getPrescription().then(data => {
      if (data !== null && data.length !== 0) {
        setPrescriptionList(data);
        setPrescriptionId('');
        setDeleteBtn(false);
      }
    });
  };
  const deletePrescription = prescriptionId => {
    getMedicine().then(data => {
      let counter = 0;
      if (data !== null && data.length !== 0) {
        data.map(item => {
          if (item.prescriptionId === prescriptionId) {
            counter += 1;
          }
        });
        if (counter > 0) {
          showAlert();
          return;
        } else {
          Alert.alert('Are you sure', 'Click ok to proceed', [
            {
              text: 'Ok',
              onPress: () => {
                getPrescription().then(data => {
                  let list = data;
                  let a = b => b.prescriptionId == prescriptionId;
                  let index = list.findIndex(a);
                  list.splice(index, 1);
                  savePrescription(list);
                  refresh();
                });
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                setPrescriptionId('');
                setDeleteBtn(false);
              },
            },
          ]);
        }
      } else {
        Alert.alert('Are you sure', 'Click ok to proceed', [
          {
            text: 'Ok',
            onPress: () => {
              getPrescription().then(data => {
                // console.log('Doctor List with no med',prescriptionId, data);
                let list = data;
                let a = b => b.prescriptionId == prescriptionId;
                let index = list.findIndex(a);
                list.splice(index, 1);
                savePrescription(list);
                refresh();
              });
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              setPrescriptionId('');
              setDeleteBtn(false);
            },
          },
        ]);
      }
    });
  };

  return deleteBtn ? (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        style={{padding: 4}}
        onPress={() => deletePrescription(prescriptionId)}
        activeOpacity={1}>
        <FontAwesomeIcon icon={faTrash} size={18} color={'white'} />
      </TouchableOpacity>
    </View>
  ) : null;
};

export default DeletePrescription;
