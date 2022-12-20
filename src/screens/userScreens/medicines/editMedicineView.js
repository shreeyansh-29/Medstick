import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPallete} from '../../../components/atoms/colorPalette';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import EditMedicineForm from './editMedicineForm';
import {addMedicineSchema} from '../../../constants/validations';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import Toast from 'react-native-toast-message';
import {SuccessToast} from '../../../components/atoms/customToast';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const EditMedicineView = ({setEdit, item, navigation}) => {
  let doctorName = item.doctorName;
  const [doseType, setDoseType] = useState(item.dosageType);
  const [pill, setPill] = useState(item.dosageType);

  const [prescriptionObj, setPrescriptionObj] = useState({
    doctorName: item.doctorName !== null ? item.doctorName : null,
    prescriptionId: item.prescriptionId !== null ? item.prescriptionId : null,
    contact: item.contact !== null ? item.prescriptionId : null,
    prescriptionUrl:
      item.prescriptionUrl !== null ? item.prescriptionUrl : null,
    location: item.location !== null ? item.location : null,
    specialization: item.specialization !== null ? item.specialization : null,
    appointmentList:
      item.appointmentList !== null ? item.appointmentList : null,
  });
  const [add, setAdd] = useState(item.doctorName !== null ? true : false);

  const getPrescriptionData = data => {
    setAdd(true);
    setPrescriptionObj(data);
  };

  const setType = () => {
    switch (pill) {
      case 'Tablet': {
        setDoseType('mg');
        break;
      }
      case 'Inhaler': {
        setDoseType('count');
        break;
      }
      case 'Injection': {
        setDoseType('ml');
        break;
      }
      case 'Syrup': {
        setDoseType('ml');
        break;
      }
      default: {
        setDoseType('mg');
      }
    }
  };
  useEffect(() => {
    setType();
  }, [pill]);

  const updateMedicineDetails = values => {
    if (Number(values.notify) > Number(values.stocks)) {
      Alert.alert('Notify Me should be less than Stock Unit', '', [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    } else {
      let obj = item;

      obj.medicineName = values.medicineName.trim();
      obj.medicineDescription = values.description.trim();
      obj.dosageType = values.pill;
      obj.dosageQuantity = values.dosageQuantity;
      obj.dosagePower = values.dosagePower + ' ' + values.doseType;
      obj.leftStock = values.notify;
      obj.stock = values.stocks;
      obj.isModified = true;

      if (prescriptionObj.doctorName !== doctorName) {
        obj.prescriptionId = prescriptionObj.prescriptionId;
        obj.doctorName = prescriptionObj.doctorName;
        obj.prescriptionUrl = prescriptionObj.prescriptionUrl;
        obj.location = prescriptionObj.location;
        obj.specialization = prescriptionObj.specialization;
        obj.contact = prescriptionObj.contact;
      }

      getMedicine().then(data => {
        const temp = data;
        temp.map((ele, index) => {
          if (ele.userMedicineId === obj.userMedicineId) {
            temp[index] = obj;
          }
        });
        AddMedicine(temp);
      });
      SuccessToast({
        text1: 'Medicine Updated Successfully',
        position: 'bottom',
      });

      setTimeout(() => {
        setEdit(false);
      }, 2000);
    }
  };

  return (
    <View style={styles.addMedicinePage}>
      <View style={styles.closeBtn}>
        <TouchableOpacity
          activeOpacity={1}
          style={{backgroundColor: 'white'}}
          onPress={() => setEdit(false)}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={colorPallete.mainColor}
            size={22}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={'padding'}
        keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              medicineName: item.medicineName,
              description: item.medicineDescription,
              pill: '',
              dosageQuantity: item.dosageQuantity,
              dosagePower: item.dosagePower.split(' ')[0],
              doseType: '',
              stocks: item.stock,
              notify: item.leftStock,
            }}
            validationSchema={addMedicineSchema}
            onSubmit={values => {
              values.doseType = doseType;
              values.pill = pill;
              updateMedicineDetails(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <EditMedicineForm
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                values={values}
                setFieldValue={setFieldValue}
                setPill={setPill}
                setDoseType={setDoseType}
                pill={pill}
                doseType={doseType}
                prescriptionObject={getPrescriptionData}
                add={add}
                setAdd={setAdd}
                navigation={navigation}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast visibilityTime={1500} />
    </View>
  );
};

const styles = StyleSheet.create({
  addMedicinePage: {
    backgroundColor: 'white',
    flex: 1,
  },
  keyboardView: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 10,
  },
  closeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    marginLeft: 12,
    marginTop: 10,
  },
});

export default EditMedicineView;
