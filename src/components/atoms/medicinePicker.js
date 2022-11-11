import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {loadGetUserMedicine} from '../../redux/action/userMedicine/getUserMedicineAction';
import {styles} from '../../styles/reportScreenStyles/reportScreenStyles';

const MedicinePicker = ({onChange}) => {
  const [medicineName, setMedicineName] = useState('');
  const dispatch = useDispatch();

  const getUserMedicine = useSelector(
    state => state.getUserMedicineReducer?.data?.result,
  );

  console.log(getUserMedicine);

  const getmedicine = () => {
    dispatch(loadGetUserMedicine());
  };

  useEffect(() => {
    getmedicine();
  }, [medicineName]);

  return (
    <View style={styles.picker}>
      <Picker
        mode="dropdown"
        id="picker1"
        selectedValue={medicineName}
        onValueChange={data => {
          setMedicineName(data);
          onChange(medicineName);
        }}>
        {getUserMedicine?.map((item, index) => {
          return (
            <Picker.Item
              label={item.medicineName}
              value={item.userMedicineId}
              key={index}
            />
          );
        })}
      </Picker>
    </View>
  );
};

export default MedicinePicker;
