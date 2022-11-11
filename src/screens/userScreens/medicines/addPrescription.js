import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AddPrescriptionHeader from '../../../components/molecules/headers/addPrescriptionHeader';
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles';
import AddPrescriptionList from '../../../components/molecules/addPrescriptionList';
import SaveButton from '../../../components/molecules/saveButton';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import LottieView from 'lottie-react-native';
import {deviceWidth} from '../../../components/atoms/constant';
import {Formik} from 'formik';
import PrescriptionForm from './prescriptionForm';
import {prescriptionValidationSchema} from '../../../constants/validations';
import CustomModal from '../../../components/molecules/customModal';
import {Dimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons';
import ImageViewer from 'react-native-image-zoom-viewer';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const AddPrescription = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('');
  console.log(uri);
  const images = [
    {
      url: uri,
    },
  ];
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorPalette.appColor,
      }}>
      <CustomModal
        modalVisible={visible}
        modalView={
          <View style={{width: '100%', marginTop: 10}}>
            <View style={{alignSelf: 'flex-end', marginRight: 6}}>
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
            <View style={{height: '100%'}}>
              <ImageViewer imageUrls={images} backgroundColor="white" />
            </View>
          </View>
        }
        customStyles={{
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
        }}
        type="slide"
        onRequestClose={() => {
          setVisible(!visible);
        }}
      />

      <SubHeader navigation={navigation} title={'Attach Prescription'} />

      <KeyboardAvoidingView
        style={{
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: 'white',
        }}
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
              doctorName: '',
              specialization: '',
              contact: '',
              location: '',
              image: '',
            }}
            validationSchema={prescriptionValidationSchema}
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
              />
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddPrescription;
