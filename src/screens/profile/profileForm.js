import {Text, View} from 'react-native';
import React from 'react';
import {colorPalette} from '../../components/atoms/colorPalette';
import InputField from '../../components/atoms/inputField';
import styles from '../../styles/profile/profileStyles';
import PickerField from '../../components/atoms/pickerField';
import {bloodGroup, gender} from '../../constants/pickerItem';
import {Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const ProfileForm = props => {
  return (
    <View style={styles.inputForm}>
      {/* <View style={styles.inputField}>
        <InputField
          styles={styles.field}
          placeholder="Full Name"
          mode="outlined"
          outlineColor="lightgrey"
          text="userName"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.userName}
        />
      </View> */}

      <View style={styles.inputField}>
        <InputField
          styles={styles.bio}
          placeholder="Bio"
          mode="outlined"
          outlineColor="lightgrey"
          text="bio"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.bio}
          // maxLength={200}
          multiline={true}
          selectTextOnFocus={true}
        />
        {props.errors.bio && props.touched.bio && (
          <Text style={styles.errorText}>{props.errors.bio}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <InputField
          styles={styles.field}
          placeholder="Contact"
          mode="outlined"
          outlineColor="lightgrey"
          text="contact"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.contact}
        />
        {props.errors.contact && props.touched.contact && (
          <Text style={styles.errorText}>{props.errors.contact}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <InputField
          styles={styles.field}
          placeholder="Date of Birth(yyyy-mm-dd)"
          mode="outlined"
          outlineColor="lightgrey"
          text="dateofBirth"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.dateofBirth}
        />
        {props.errors.dateofBirth && props.touched.dateofBirth && (
          <Text style={styles.errorText}>{props.errors.dateofBirth}</Text>
        )}
      </View>

      <View style={styles.inputField}>
        <InputField
          styles={styles.field}
          placeholder="Address"
          mode="outlined"
          outlineColor="lightgrey"
          text="address"
          activeOutlineColor={colorPalette.mainColor}
          {...props}
          value={props.values.address}
          // maxLength={100}
        />
        {props.errors.address && props.touched.address && (
          <Text style={styles.errorText}>{props.errors.address}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.subInputGroup}>
          <InputField
            styles={{backgroundColor: 'white'}}
            placeholder="State"
            mode="outlined"
            outlineColor="lightgrey"
            text="state"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.state}
          />
          {props.errors.state && props.touched.state && (
            <Text style={styles.errorText1}>{props.errors.state}</Text>
          )}
        </View>
        <View style={styles.subInputGroup}>
          <InputField
            styles={{backgroundColor: 'white'}}
            placeholder="Country"
            mode="outlined"
            outlineColor="lightgrey"
            text="country"
            activeOutlineColor={colorPalette.mainColor}
            {...props}
            value={props.values.country}
          />
          {props.errors.country && props.touched.country && (
            <Text style={styles.errorText1}>{props.errors.country}</Text>
          )}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <View style={styles.subInputGroup}>
          <View style={styles.picker}>
            <PickerField
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
          <View style={styles.picker}>
            <PickerField
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
