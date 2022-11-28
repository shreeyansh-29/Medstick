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

const DeletePrescription = ({
  deleteBtn,
  prescriptionId,
  setPrescriptionList,
  setPrescriptionId,
  setDeleteBtn,
}) => {
  const showAlert = () => {
    Alert.alert(
      "Can't delete this precription",
      'Added in some other medicine',
      [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ],
    );
  };
  const deletePrescription = prescriptionId => {
    getMedicine().then(data => {
      if (data !== null && data.length !== 0) {
        let flag = false;
        data.map(item => {
          if (item.prescriptionId === prescriptionId) {
            flag = true;
          }
        });
        if (flag) showAlert();
        else {
          console.log('in');
          getPrescription().then(data => {
            let list = data;
            let a = b => b.prescriptionId == prescriptionId;
            let index = list.findIndex(a);
            list.splice(index, 1);
            savePrescription(list);
            getPrescription().then(data => {
              if (data !== null) {
                setPrescriptionList(data);
                setPrescriptionId('');
                setDeleteBtn(false);
              }
            });
          });
        }
      } else {
        Alert.alert('Are you sure!!!', 'Click ok to proceed', [
          {
            text: 'Ok',
            onPress: () => {
              getPrescription().then(data => {
                let list = data;
                let a = b => b.prescriptionId == prescriptionId;
                let index = list.findIndex(a);
                list.splice(index, 1);
                savePrescription(list);
                getPrescription().then(data => {
                  if (data !== null) {
                    setPrescriptionList(data);
                    setPrescriptionId('');
                    setDeleteBtn(false);
                  }
                });
              });
            },
          },
          {
            text: 'Cancel',
            onPress: () => {},
          },
        ]);
      }
    });
  };

  return deleteBtn ? (
    <View style={styles.bellIcon}>
      <TouchableOpacity
        onPress={() => deletePrescription(prescriptionId)}
        activeOpacity={1}>
        <FontAwesomeIcon icon={faTrash} size={18} color={'white'} />
      </TouchableOpacity>
    </View>
  ) : null;
};

export default DeletePrescription;