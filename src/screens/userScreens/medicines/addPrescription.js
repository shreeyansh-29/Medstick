import { View, ScrollView } from 'react-native'
import React from 'react'
import AddPrescriptionHeader from '../../../components/molecules/headers/addPrescriptionHeader'
import { MedicinePanel } from '../../../styles/medicinePanelStyles/medicinePanelStyles'
import AddPrescriptionList from '../../../components/molecules/addPrescriptionList'
import SaveButton from '../../../components/molecules/saveButton'

const AddPrescription = ({ navigation }) => {

    return (
        <View style={MedicinePanel.addPrescriptionContainer}>
            <View style={MedicinePanel.addPrescriptionHeader}>
                <AddPrescriptionHeader
                    navigation={navigation}
                />
            </View>
            <View style={MedicinePanel.addPrescriptionList}>
                <AddPrescriptionList />
                <SaveButton/>
            </View>
        </View>
    )
}

export default AddPrescription