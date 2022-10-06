import { View, ScrollView } from 'react-native'
import React from 'react'
import AddPrescriptionHeader from '../../../components/molecules/headers/addPrescriptionHeader'
import Styles from '../../../styles/medicinePanelStyles/medicinePanelStyles'
import AddPrescriptionList from '../../../components/molecules/addPrescriptionList'
import SaveButton from '../../../components/molecules/saveButton'

const AddPrescription = ({ navigation }) => {

    return (
        <View style={Styles.addPrescriptionContainer}>
            <View style={Styles.addPrescriptionHeader}>
                <AddPrescriptionHeader
                    navigation={navigation}
                />
            </View>
            <View style={Styles.addPrescriptionList}>
                <AddPrescriptionList />
            </View>
            <View >
                <SaveButton/>
            </View>
        </View>
    )
}

export default AddPrescription