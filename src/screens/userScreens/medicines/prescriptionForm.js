import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import InputField from '../../../components/atoms/inputField';
import {colorPalette} from '../../../components/atoms/colorPalette';
import CustomButton from '../../../components/atoms/customButton';
import {Divider} from 'react-native-paper';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';

const PrescriptionForm = props => {
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 620,
      height: 820,
      cropping: true,
    }).then(image => {
      props.setFieldValue('image', image.path);
      props.setUri(image.path);
    });
  };

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      width: 620,
      height: 820,
      cropping: true,
    }).then(image => {
      props.setFieldValue('image', image.path);
      props.setUri(image.path);
    });
  };

  return (
    <View
      style={{
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
      }}>
      <View>
        <Text style={{fontSize: 16, color: 'gray', marginBottom: 6}}>
          DETAILS
        </Text>
        <View style={styles.inputField}>
          <InputField
            styles={styles.bio}
            label="Doctor Name"
            mode="outlined"
            outlineColor="lightgrey"
            text="doctorName"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.doctorName}
          />
          {props.errors.doctorName && props.touched.doctorName && (
            <Text style={styles.errorText}>{props.errors.doctorName}</Text>
          )}
        </View>

        <View style={styles.inputField}>
          <InputField
            styles={styles.bio}
            label="Specialization"
            mode="outlined"
            outlineColor="lightgrey"
            text="specialization"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.specialization}
          />
          {props.errors.specialization && props.touched.specialization && (
            <Text style={styles.errorText}>{props.errors.specialization}</Text>
          )}
        </View>

        <View style={styles.inputField}>
          <InputField
            styles={styles.bio}
            label="Contact"
            mode="outlined"
            outlineColor="lightgrey"
            text="contact"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.contact}
            keyboardType="numeric"
          />
          {props.errors.contact && props.touched.contact && (
            <Text style={styles.errorText}>{props.errors.contact}</Text>
          )}
        </View>

        <View style={styles.inputField}>
          <InputField
            styles={styles.bio}
            label="Location"
            mode="outlined"
            outlineColor="lightgrey"
            text="location"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.location}
          />
          {props.errors.location && props.touched.location && (
            <Text style={styles.errorText}>{props.errors.location}</Text>
          )}
        </View>
      </View>

      <Divider style={{height: 1, marginVertical: 14}} />

      <View>
        <Text style={{fontSize: 16, color: 'gray'}}>UPLOAD</Text>
        <Text style={{color: 'black', marginTop: 10, fontSize: 15}}>
          Please upload images of valid prescription from your doctor.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 12,
          }}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            activeOpacity={1}
            onPress={openCamera}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: colorPalette.mainColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesomeIcon icon={faCamera} color={'white'} size={20} />
            </View>
            <Text style={{fontSize: 13, marginTop: 4}}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center', marginLeft: 30}}
            activeOpacity={1}
            onPress={uploadPhoto}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: colorPalette.mainColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesomeIcon icon={faImage} color={'white'} size={20} />
            </View>
            <Text style={{fontSize: 13, marginTop: 4}}>Gallery</Text>
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            {props.values.image ? (
              <View style={{height: 128}}>
                <TouchableOpacity
                  onPress={() => props.setVisible(true)}
                  activeOpacity={1}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 12,
                    borderColor: 'lightgrey',
                    borderWidth: 1,
                    overflow: 'hidden',
                  }}>
                  <Image
                    resizeMode="stretch"
                    source={{uri: props?.values?.image}}
                    style={{width: '100%', height: '100%', borderRadius: 11}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center',
                  }}
                  onPress={() => {
                    props.setFieldValue('image', '');
                    props.setUri('');
                  }}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    size={18}
                    color={colorPalette.redPercentageColor}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      {props.errors.image && props.touched.image && (
        <Text style={styles.errorText}>{props.errors.image}</Text>
      )}
      <Divider style={{height: 1, marginTop: 14}} />

      <CustomButton
        loading={props.load}
        title={'Save'}
        handleSubmit={props.handleSubmit}
        contStyles={{alignItems: 'center', marginVertical: 40}}
        btnStyles={{
          backgroundColor: colorPalette.mainColor,
          width: '50%',
          borderRadius: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    marginBottom: 10,
  },
  fieldHeading: {fontSize: 17, color: 'grey', fontWeight: '500'},
  bio: {height: 50, backgroundColor: 'white', color: 'green'},
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 14,
    marginTop: 1,
  },
});

export default PrescriptionForm;
