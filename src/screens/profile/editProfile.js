import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import SavedDetails from './savedDetails';
import SubHeader from '../../components/molecules/headers/subHeader';
import {useIsFocused} from '@react-navigation/native';
import CustomModal from '../../components/molecules/customModal';
import styles from '../../styles/profile/profileStyles';
import RenderModalView from './renderModalView';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfileRequest} from '../../redux/action/profileAction/getUserProfileAction';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.getUserProfile?.data);

  useEffect(() => {
    dispatch(getUserProfileRequest());
  }, []);

  const [name, namestate] = useState({
    user: {name: '', photo: '', email: ''},
  });
  const focused = useIsFocused();
  const [img, imgstate] = useState('https://i.stack.imgur.com/l60Hf.png');

  const getUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    namestate(user);
    imgstate(user.user.photo);
  };

  useEffect(() => {
    if (focused) {
      getUser();
    }
  }, [focused]);

  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  return (
    <View style={styles.parentContainer}>
      <SubHeader title={'My Profile'} navigation={navigation} />
      <View style={styles.childCont}>
        <Image source={{uri: img}} style={styles.image} />
        <View style={styles.infoCont}>
          <Text style={styles.name}>{name.user.name}</Text>
          <Text style={styles.email}>{name.user.email}</Text>
        </View>

        {edit ? null : (
          <TouchableOpacity
            onPress={() => {
              setEdit(true);
              setIsCancel(true);
              setModalVisible(true);
            }}
            style={styles.editBtn}>
            <Text style={styles.editText}>Edit</Text>
            <FontAwesomeIcon icon={faPenToSquare} size={16} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
      {edit ? (
        <>
          <CustomModal
            type="slide"
            modalVisible={modalVisible}
            modalView={
              <RenderModalView
                isCancel={isCancel}
                onPress={() => {
                  setModalVisible(false);
                  setEdit(false);
                }}
                setModalVisible={setModalVisible}
                setEdit={setEdit}
                result={res}
              />
            }
            customStyles={styles.modalView}
          />
        </>
      ) : (
        <SavedDetails />
      )}
    </View>
  );
};

export default EditProfile;
