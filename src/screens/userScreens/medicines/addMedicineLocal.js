import {View, Animated, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import SubHeader from '../../../components/molecules/headers/subHeader';
import LottieView from 'lottie-react-native';
import {Formik} from 'formik';
import AddMedicineForm from './addMedicineForm';
import {addMedicineSchema} from '../../../constants/validations';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AddMedicineLocal = ({navigation}) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [doseType, setDoseType] = useState('');
  const [pill, setPill] = useState('tablet');

  const setType = () => {
    switch (pill) {
      case 'tablet': {
        setDoseType('mg');
        break;
      }
      case 'inhaler': {
        setDoseType('count');
        break;
      }
      case 'injection': {
        setDoseType('ml');
        break;
      }
      case 'syrup': {
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

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
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
              pill: pill,
              dosageQuantity: '',
              dosagePower: '',
              doseType: doseType,
              stocks: '',
              notify: '',
            }}
            validationSchema={addMedicineSchema}
            onSubmit={values => {
              console.log(values);
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
                navigation={navigation}
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddMedicineLocal;
