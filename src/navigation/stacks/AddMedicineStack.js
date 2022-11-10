import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddMedicine from '../../screens/userScreens/medicines/addMedicine';
import AddPrescription from '../../screens/userScreens/medicines/addPrescription';
import AddPrescriptionPanel from '../../screens/userScreens/medicines/addPrescriptionPanel';

const Stack = createNativeStackNavigator();

const AddMedicineStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AddMedicine"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddMedicine" component={AddMedicine} />
      <Stack.Screen name="Prescription" component={AddPrescription} />
      <Stack.Screen
        name="addPrescriptionPanel"
        component={AddPrescriptionPanel}
      />
    </Stack.Navigator>
  );
};

export default AddMedicineStack;
