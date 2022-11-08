import {Text, View} from 'react-native';
import React from 'react';
import {colorPalette} from '../../components/atoms/colorPalette';
import InputField from '../../components/atoms/inputField';
import styles from '../../styles/profile/profileStyles';
import PickerField from '../../components/atoms/customPicker';
import {bloodGroup, gender} from '../../constants/pickerItem';
import {Button} from 'react-native-elements';

const ProfileForm = props => {
  return (
    <View style={styles.inputForm}>
      <View style={styles.inputField}>
        <Text style={styles.fieldHeading}>Bio :</Text>
        <InputField
          dense={true}
          styles={styles.bio}
          placeholder="Bio"
          mode="outlined"
          outlineColor="lightgrey"
          text="bio"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.bio}
          multiline={true}
          selectTextOnFocus={true}
        />
        {props.errors.bio && props.touched.bio && (
          <Text style={styles.errorText}>{props.errors.bio}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <Text style={styles.fieldHeading}>Contact :</Text>
        <InputField
          styles={styles.field}
          dense={true}
          placeholder="Contact"
          mode="outlined"
          outlineColor="lightgrey"
          text="contact"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.contact}
          keyboardType="numeric"
          selectTextOnFocus={true}
        />
        {props.errors.contact && props.touched.contact && (
          <Text style={styles.errorText}>{props.errors.contact}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <Text style={styles.fieldHeading}>Date Of Birth :</Text>
        <InputField
          styles={styles.field}
          dense={true}
          placeholder="Date of Birth(yyyy-mm-dd)"
          mode="outlined"
          outlineColor="lightgrey"
          text="dateofBirth"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.dateofBirth}
          keyboardType="numeric"
          selectTextOnFocus={true}
        />
        {props.errors.dateofBirth && props.touched.dateofBirth && (
          <Text style={styles.errorText}>{props.errors.dateofBirth}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <Text style={styles.fieldHeading}>Address :</Text>
        <InputField
          styles={styles.field}
          dense={true}
          placeholder="Address"
          mode="outlined"
          outlineColor="lightgrey"
          text="address"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.address}
          selectTextOnFocus={true}
        />
        {props.errors.address && props.touched.address && (
          <Text style={styles.errorText}>{props.errors.address}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.subInputGroup}>
          <Text style={styles.fieldHeading}>State :</Text>
          <InputField
            styles={{backgroundColor: 'white', height: 50}}
            dense={true}
            placeholder="State"
            mode="outlined"
            outlineColor="lightgrey"
            text="state"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.state}
            selectTextOnFocus={true}
          />
          {props.errors.state && props.touched.state && (
            <Text style={styles.errorText1}>{props.errors.state}</Text>
          )}
        </View>
        <View style={styles.subInputGroup}>
          <Text style={styles.fieldHeading}>Country :</Text>
          <InputField
            styles={{backgroundColor: 'white', height: 50}}
            placeholder="Country"
            mode="outlined"
            outlineColor="lightgrey"
            text="country"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.country}
            selectTextOnFocus={true}
          />
          {props.errors.country && props.touched.country && (
            <Text style={styles.errorText1}>{props.errors.country}</Text>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.subInputGroup}>
          <Text style={styles.pickerHeading}>Blood Group :</Text>
          <View style={styles.picker}>
            <PickerField
              styles={{
                color: 'black',
              }}
              pickerItem={bloodGroup}
              mode="dialog"
              selectedValue={props.values.bloodGroup}
              text="bloodGroup"
              {...props}
            />
          </View>
          {props.errors.bloodGroup && props.touched.bloodGroup && (
            <Text style={styles.errorText1}>{props.errors.bloodGroup}</Text>
          )}
        </View>
        <View style={styles.subInputGroup}>
          <Text style={styles.pickerHeading}>Gender :</Text>
          <View style={styles.picker}>
            <PickerField
              styles={{
                color: 'black',
              }}
              pickerItem={gender}
              mode="dialog"
              selectedValue={props.values.gender}
              text="gender"
              {...props}
            />
          </View>
          {props.errors.gender && props.touched.gender && (
            <Text style={styles.errorText1}>{props.errors.gender}</Text>
          )}
        </View>
      </View>

      <View>
        <Button
          title="Save"
          buttonStyle={styles.editButton}
          containerStyle={styles.editButtonContainer}
          onPress={props.handleSubmit}></Button>
      </View>
    </View>
  );
};

export default ProfileForm;
