import {View, KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {Formik} from 'formik';
import AddMedicineForm from './addMedicineForm';
import {addMedicineSchema} from '../../../constants/validations';
import {colorPallete} from '../../../components/atoms/colorPalette';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import {ErrorToast, SuccessToast} from '../../../components/atoms/customToast';
import {CustomAlert} from '../../../components/atoms/customAlert';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AddMedicineLocal = ({navigation}) => {
  //React useState hooks
  const [doseType, setDoseType] = useState('');
  const [pill, setPill] = useState('Tablet');
  const [prescriptionObj, setPrescriptionObj] = useState({
    doctorName: null,
    prescriptionId: null,
    contact: null,
    prescriptionUrl: null,
    location: null,
    specialization: null,
  });
  const [add, setAdd] = useState(false);

  //React useEffect Hooks
  useEffect(() => {
    setType();
  }, [pill]);

  //Function to set prescription details
  const getPrescriptionData = data => {
    setAdd(true);
    setPrescriptionObj(data);
  };

  //Function to set doseType wrt dosageType
  const setType = () => {
    switch (pill) {
      case 'Tablet': {
        setDoseType('mg');
        break;
      }
      case 'Injection': {
        setDoseType('ml');
        break;
      }
      default: {
        setDoseType('mg');
      }
    }
  };

  //Function to Save Medicine
  const saveMedicineLocal = values => {
    //comparing if left stock is greater than total stock
    //if true, showing alert
    if (Number(values.notify) > Number(values.stocks)) {
      CustomAlert({text1: 'Notify Me should be less than Stock Unit'});
    } else {
      let userMedicineId = uuid.v4();
      let medicineId = uuid.v4();

      let obj = {
        userMedicineId: userMedicineId,
        medicineId: medicineId,
        medicineName: values.medicineName.trim(),
        medicineDescription: values.description.trim(),
        prescriptionId: prescriptionObj.prescriptionId,
        doctorName: prescriptionObj.doctorName,
        prescriptionUrl: prescriptionObj.prescriptionUrl,
        location: prescriptionObj.location,
        specialization: prescriptionObj.specialization,
        contact: prescriptionObj.contact,
        present: 'true',
        dosageType: pill,
        dosageQuantity: Number(values.dosageQuantity),
        dosagePower: values.dosagePower + ' ' + values.doseType,
        leftStock: Number(values.notify),
        stock: Number(values.stocks),
        reminderId: null,
        startDate: null,
        endDate: null,
        days: '',
        reminderTitle: null,
        reminderTime: null,
        everyday: null,
        noEndDate: null,
        reminderStatus: null,
        frequency: null,
        beforeAfter: null,
        totalReminders: null,
        currentCount: null,
        historyList: [],
        appointmentList: [],
        notes: '',
        isModified: false,
      };

      getMedicine()
        .then(data => {
          //checking if their is previously data is stored
          if (data !== null && data.length !== 0) {
            //if yes, concatinating the new data
            const temp = [...data, obj];
            //pushing updatedList
            AddMedicine(temp);
            SuccessToast({
              text1: 'Medicine Saved Successfully',
              position: 'bottom',
            });
          }
          //if store is empty
          else if (data === null || data.length === 0) {
            let temp = [];
            temp.push(obj);
            AddMedicine(temp);
            SuccessToast({
              text1: 'Medicine Saved Successfully',
              position: 'bottom',
            });
          }
        })
        .then(() => [
          setTimeout(() => {
            navigation.navigate('Home');
          }, 2000),
        ])
        .catch(errors => {
          //some error occured
          console.log(errors);
          ErrorToast({
            text1: 'Something Went Wrong',
            text2: 'Please Try Again',
            position: 'bottom',
          });
        });
    }
  };

  return (
    <View style={Styles.addMedicinePage}>
      <SubHeader navigation={navigation} title={'Add Medicine'} />

      <KeyboardAvoidingView
        style={Styles.keyboardView}
        behavior={'padding'}
        keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              medicineName: '',
              description: '',
              pill: '',
              dosageQuantity: '',
              dosagePower: '',
              doseType: '',
              stocks: '',
              notify: '',
            }}
            validationSchema={addMedicineSchema}
            onSubmit={values => {
              values.doseType = doseType;
              values.pill = pill;
              saveMedicineLocal(values);
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
              <AddMedicineForm
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
                navigation={navigation}
                prescriptionObject={getPrescriptionData}
                add={add}
                setAdd={setAdd}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast visibilityTime={1500} />
    </View>
  );
};

const Styles = StyleSheet.create({
  addMedicinePage: {
    backgroundColor: colorPallete.mainColor,
    flex: 1,
  },
  keyboardView: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 10,
  },
});

export default AddMedicineLocal;
