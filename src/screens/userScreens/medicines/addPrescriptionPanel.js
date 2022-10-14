import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddPrescriptionPanelHeader from '../../../components/molecules/headers/addPrescriptionPanelHeader'
import AddNewPrescription from '../../../components/molecules/addNewPrescription'
import ExistingPrescriptionText from '../../../components/atoms/existingPrescriptionText'
import { useDispatch, useSelector } from 'react-redux'
import { loadGetPrescription } from '../../../redux/action/doctorPrescription/getPrescriptionAction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NoData from '../../../components/atoms/noData'
import { colorPalette } from '../../../components/atoms/colorPalette'


const AddPrescriptionPanel = ({ navigation }) => {
    const [id, setId] = useState('')
    const [token, setToken] = useState('')
    const [pageNo, setPageNo] = useState(0)
    const pageSize = 2
    const dispatch = useDispatch()
    const getAllPrescription = useSelector(state => state.getPrescriptionReducer)
    console.log(getAllPrescription, "getallPrescription")

    const getTokenId = async () => {
        const tokentemp = await AsyncStorage.getItem('accessToken')
        setToken(tokentemp)
        const tempId = await AsyncStorage.getItem('user_id')
        setId(tempId)
    }
    useEffect(() => {
        getTokenId()
    }, [])

    const getAllPrescriptions = () => {
        dispatch(loadGetPrescription(id, token, pageNo, pageSize))
    }

    useEffect(() => {
        getAllPrescriptions(id, token)
    }, [id])

    return (
        <View style={{ flex: 1, backgroundColor: colorPalette.backgroundColor }}>
            <View>
                <AddPrescriptionPanelHeader
                    navigation={navigation}
                />
            </View>
            <AddNewPrescription navigation={navigation} />
            <ExistingPrescriptionText />
            {getAllPrescription?.data?.result?.length === 0 ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../../assets/images/noPrescription.png')} resizeMode='contain' style={{ width: '80%' }} />
                </View>
                :
                <Text>addPrescriptionPanel</Text>
            }

        </View>
    )
}

export default AddPrescriptionPanel