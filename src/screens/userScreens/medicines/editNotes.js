import {
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import CustomButton from '../../../components/atoms/customButton';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {useDispatch, useSelector} from 'react-redux';
import {medicineNotesRequest} from '../../../redux/action/medicineNotes/medicineNotesAction';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import {updateNotesSchema} from '../../../constants/validations';
import InputField from '../../../components/atoms/inputField';

const avoidKeyboardRequired = Platform.OS === 'ios' && avoidKeyboard;

const EditNotes = ({userMedicineId, res, setVisible}) => {
  console.log(res);
  const dispatch = useDispatch();
  const resultNotes = useSelector(state => state.medicineNotes?.data); 

  return (
    <View
      style={{
        height: 280,
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: '#fff',
        borderRadius: 10,
      }}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={'padding'}
        keyboardVerticalOffset={avoidKeyboardRequired ? -125 : -500}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Formik
            validator={() => ({})}
            enableReinitialize
            initialValues={{
              notes: res?.notes,
            }}
            validationSchema={updateNotesSchema}
            onSubmit={values => {
              let notes = values.notes;
              dispatch(medicineNotesRequest({notes, userMedicineId}));
              if(resultNotes.status === "Success"){
                setVisible(false);
              }
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{}}>
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 20,
                      fontWeight: '700',
                      marginBottom: 8,
                      textAlign: 'center',
                    }}>
                    Notes
                  </Text>
                </View>
                <View style={{width: '90%', alignSelf: 'center'}}>
                  <InputField
                    multiline={true}
                    numberOfLines={2}
                    mode="outlined"
                    label="Notes"
                    outlineColor="#02aba6"
                    activeOutlineColor="#02aba6"
                    value={values.notes}
                    styles={{height: 100}}
                    selectTextOnFocus={true}
                    text="notes"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {errors.notes && touched.notes && (
                    <Text style={{color: 'red'}}>{errors.notes}</Text>
                  )}
                </View>
                <CustomButton
                  title={'Save'}
                  handleSubmit={handleSubmit}
                  contStyles={{
                    marginVertical: 40,
                    width: '30%',
                    alignSelf: 'center',
                  }}
                  btnStyles={{
                    backgroundColor: colorPalette.mainColor,
                    borderRadius: 5,
                    paddingHorizontal: 20,
                  }}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </View>
  );
};

export default EditNotes;
