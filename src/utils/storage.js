import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddMedicine = async data => {
  try {
    await AsyncStorage.setItem('AddMedicine', JSON.stringify(data));
    const res = JSON.parse(await AsyncStorage.getItem('AddMedicine'));
  } catch (error) {
    console.log(error);
  }
};

export const getMedicine = async () => {
  try {
    const response = JSON.parse(await AsyncStorage.getItem('AddMedicine'));
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const savePrescription = async data => {
  try {
    await AsyncStorage.setItem('SavePrescription', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getPrescription = async () => {
  try {
    const response = JSON.parse(await AsyncStorage.getItem('SavePrescription'));
    return response;
  } catch (error) {
    console.log(error);
  }
};
