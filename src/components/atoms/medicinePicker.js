import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {loadGetUserMedicine} from '../../redux/action/userMedicine/getUserMedicineAction';
import {styles} from '../../styles/reportScreenStyles/reportScreenStyles';

const MedicinePicker = (props) => {
    const [medicineName, setMedicineName] = useState('')
    const dispatch = useDispatch()

    const getUserMedicinedata = useSelector(state => state.getUserMedicineReducer?.data)
    const getUserMedicine = useSelector(state => state.getUserMedicineReducer?.data?.result)
    const getmedicine = () => {
        dispatch(loadGetUserMedicine())
    }

    useEffect(() => {
        getmedicine()
    }, [medicineName])

    const onchangeFnc = (data) => {
        setMedicineName(data)
        props.onChange(medicineName)
    }


    return (

        <View style={styles.picker} >

            <Picker
                id='picker1'
                selectedValue={medicineName}
                onValueChange={(data) => onchangeFnc(data)}

            >

                {getUserMedicine?.map((item, index) => {

                    return (

                        <Picker.Item
                            label={item.medicineName}
                            value={item.userMedicineId}
                            key={index}
                        />


                    )
                })}


            </Picker>
        </View >

    )
}

export default MedicinePicker;
