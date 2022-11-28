import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAvoidingView} from 'react-native';
import {Formik} from 'formik';
import EditMedicineForm from './editMedicineForm';
import {addMedicineSchema} from '../../../constants/validations';
import {AddMedicine, getMedicine} from '../../../utils/storage';
import Toast from 'react-native-toast-message';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const EditMedicineView = ({setEdit, item}) => {
  const [doseType, setDoseType] = useState(item.dosageType);
  const [pill, setPill] = useState(item.dosageType);
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
        item;
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
    let obj = item;

    obj.medicineName = values.medicineName;
    obj.medicineDescription = values.description;
    obj.dosageType = values.pill;
    obj.dosageQuantity = values.dosageQuantity;
    obj.dosagePower = values.dosagePower + ' ' + values.doseType;
    obj.leftStock = values.notify;
    obj.stock = values.stocks;

    getMedicine().then(data => {
      const temp = data;
      temp.map((ele, index) => {
        if (ele.userMedicineId === obj.userMedicineId) {
          temp[index] = obj;
        }
      });
      AddMedicine(temp);
    });
    Toast.show({
      text1: 'Medicine Updated Successfully',
      type: 'success',
      position: 'bottom',
    });
    setTimeout(() => {
      setEdit(false);
    }, 1000);  console.log('before', data);

  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: 'white',
          marginLeft: 12,
          marginTop: 10,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{backgroundColor: 'white'}}
          onPress={() => setEdit(false)}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={colorPalette.mainColor}
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
                // connection={connection}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast visibilityTime={500} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default EditMedicineView;
