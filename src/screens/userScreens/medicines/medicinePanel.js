import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MedicineHeader from '../../../components/molecules/headers/medicineHeader'
import { styles } from '../../../assests/styles/MedicinePanelStyles'
import { fontStyle } from '../../../assests/styles/fontStyles'
const MedicinePanel = () => {
    const medicines = [
    {name: 'Paracetamol',type:'xjox',Power:'600mg'},
    { name: 'evil' ,type:'bava',Power:'500mg'},
    { name: 'Pain killer',type:'bava',Power:'300mg' },
]
    return (
        <View>
            <MedicineHeader
                title={"Medicines"}
            />
            <View style={styles.flatlistL}>
            <FlatList
                data={medicines}
                renderItem={(Element)=>{
                    return (
                        <View>
                        <Text style={fontStyle.header1}>{Element.item.name}</Text>
                        <Text style={fontStyle.header1}>{Element.item.type}</Text>
                        <Text>{Element.item.Power}</Text>
                        </View>
                    )
                }}
                initialNumToRender={10}
                numColumns={1}
            />
</View>

        </View>

    )
}

export default MedicinePanel