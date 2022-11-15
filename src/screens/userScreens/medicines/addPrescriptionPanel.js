import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddPrescriptionPanelHeader from '../../../components/molecules/headers/addPrescriptionPanelHeader'
import AddNewPrescription from '../../../components/molecules/addNewPrescription'
import ExistingPrescriptionText from '../../../components/atoms/existingPrescriptionText'
import { useDispatch, useSelector } from 'react-redux'
import { loadGetPrescription } from '../../../redux/action/doctorPrescription/getPrescriptionAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoData from '../../../components/atoms/noData'
import { colorPalette } from '../../../components/atoms/colorPalette'
import PrescriptionBox from '../../../components/atoms/prescriptionBox'
import { getPrescription } from '../../../utils/storage'


const AddPrescriptionPanel = ({ navigation }) => {
    const [id, setId] = useState('')
    const [token, setToken] = useState('')
    const [pageNo, setPageNo] = useState(0)
    const pageSize = 2
    const dispatch = useDispatch()
    // const getAllPrescription = useSelector(state => state.getPrescriptionReducer?.data?.result)
    // console.log(getAllPrescription, "getallPrescription")
    const [prescriptionList,setPrescriptionList]=useState('')
    console.log(prescriptionList,"plist")
    useEffect(()=>{
      getPrescription().then (data=>setPrescriptionList(data))
    },[])

    const getTokenId = async () => {
        const tokentemp = await AsyncStorage.getItem('accessToken')
        setToken(tokentemp)
        const tempId = await AsyncStorage.getItem('user_id')
        setId(tempId)
    }
    useEffect(() => {
        getTokenId()
    }, [])

   

 

    return (
        <View style={{ flex: 1, backgroundColor: colorPalette.backgroundColor }}>
            <View>
                <AddPrescriptionPanelHeader
                    navigation={navigation}
                />
            </View>
            <AddNewPrescription navigation={navigation} />
            <ExistingPrescriptionText />
            {prescriptionList === ''?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/images/noPrescription.png')} resizeMode='contain' style={{ width: '80%' }} />
                </View>
                :
                
                prescriptionList?.map((item)=>(
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('AddMedicine',{
                            data:item
                        })
                    }}>
                    <PrescriptionBox
                        
                        doctorName={item.doctorName}
                        locations={item.location}
                        contact={item.contact}
                        specialization={item.specialization}
                        prescriptionUrl={item.prescriptionUrl}
                    />
                    </TouchableOpacity>
                ))
                
                

            }

        </View>
    )
}

export default AddPrescriptionPanel