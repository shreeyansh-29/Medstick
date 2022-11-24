import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colorPalette} from '../../components/atoms/colorPalette';
import CustomModal from '../../components/molecules/customModal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Formik} from 'formik';
import {prescriptionValidationSchema} from '../../constants/validations';
import PrescriptionForm from '../userScreens/medicines/prescriptionForm';
import Toast from 'react-native-toast-message';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import {getPrescription, savePrescription} from '../../utils/storage';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const RenderModalView = ({item, setEdit, navigation}) => {
  const [visible, setVisible] = useState(false);
  const [load, loadstate] = useState(false);
  const [uri, setUri] = useState('');
  const images = [
    {
      url: uri,
    },
  ];

  const savePrescriptionValues = values => {
    loadstate(true);
    let prescription_id = item.prescriptionId;
    let obj = {
      prescriptionId: prescription_id,
      doctorName: values.doctorName,
      specialization: values.specialization,
      contact: values.contact,
      location: values.location,
      prescriptionUrl: values.image,
      appointmentList: item.appointmentList,
    };

    getPrescription().then(data => {
      if (data !== null) {
        let updateList = data;
        let a = b => b.prescriptionId == prescription_id;
        let index = updateList.findIndex(a);
        updateList[index] = obj;
        savePrescription(updateList);
        Toast.show({
          text1: 'Prescription Updated Successfully',
          type: 'success',
          position: 'bottom',
        });
      } else {
        Toast.show({
          text1: 'Something Went Wrong',
          type: 'error',
          position: 'bottom',
        });
      }
    });
    loadstate(false);
    setTimeout(() => {
      navigation.pop();
    }, 1000);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CustomModal
        modalVisible={visible}
        modalView={
          <View style={styles.modalView}>
            <View style={styles.touchable}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                activeOpacity={1}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  color={colorPalette.mainColor}
                  size={26}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.img}>
              <ImageViewer imageUrls={images} backgroundColor="white" />
            </View>
          </View>
        }
        customStyles={styles.customStyles}
        type="slide"
        onRequestClose={() => {
          setVisible(!visible);
        }}
      />
      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: colorPalette.backgroundColor,
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
              doctorName: item.doctorName,
              specialization: item.specialization,
              contact: item.contact,
              location: item.location,
              image: item.prescriptionUrl,
            }}
            validationSchema={prescriptionValidationSchema}
            onSubmit={values => {
              savePrescriptionValues(values);
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
              <PrescriptionForm
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                values={values}
                setVisible={setVisible}
                setFieldValue={setFieldValue}
                setUri={setUri}
                load={load}
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
  container: {flex: 1, backgroundColor: colorPalette.mainColor},
  modalView: {width: '100%', marginTop: 10},
  touchable: {alignSelf: 'flex-end', marginRight: 6},
  customStyles: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: Dimensions.get('window').width,
  },
  img: {height: '100%'},
  keyboardView: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
});

export default RenderModalView;
