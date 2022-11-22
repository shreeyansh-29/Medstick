import {
  View,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {Formik} from 'formik';
import AddMedicineForm from './addMedicineForm';
import {addMedicineSchema} from '../../../constants/validations';
import {colorPalette} from '../../../components/atoms/colorPalette';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import CheckConnection from '../../../connectivity/checkConnection';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AddMedicineLocal = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
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
  const [connection, setConnection] = useState(false);

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

  const checkconnection = async () => {
    let conn = await CheckConnection();
    setConnection(conn);
  };

  useEffect(() => {
    checkconnection();
  }, []);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const saveMedicineLocal = values => {
    let userMedicineId = uuid.v4();
    let medicineId = uuid.v4();

    let obj = {
      userMedicineId: userMedicineId,
      medicineId: medicineId,
      medicineName: values.medicineName,
      medicineDescription: values.description,
      prescriptionId: prescriptionObj.prescriptionId,
      doctorName: prescriptionObj.doctorName,
      prescriptionUrl: prescriptionObj.prescriptionUrl,
      location: prescriptionObj.location,
      specialization: prescriptionObj.specialization,
      contact: prescriptionObj.contact,
      present: 'true',
      dosageType: pill,
      dosageQuantity: values.dosageQuantity,
      dosagePower: values.dosagePower + values.doseType,
      leftStock: values.notify,
      stock: values.stocks,
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
    };

    getMedicine().then(data => {
      if (data !== null) {
        console.log(data, 'before');
        const temp = [...data, obj];
        console.log(temp, 'after');
        AddMedicine(temp);
        Toast.show({
          text1: 'Medicine Saved Successfully',
          type: 'success',
        });
      } else if (data === null || data === undefined) {
        let temp = [];
        temp.push(obj);
        AddMedicine(temp);
        Toast.show({
          text1: 'Medicine Saved Successfully',
          type: 'success',
        });
      } else {
        Toast.show({
          text1: 'Something Went Wrong',
          type: 'error',
        });
      }
    });
    setTimeout(() => {
      navigation.pop();
    }, 5000);
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
                connection={connection}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast visibilityTime={2000} />
    </View>
  );
};

const Styles = StyleSheet.create({
  addMedicinePage: {
    backgroundColor: colorPalette.mainColor,
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
