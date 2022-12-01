import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {useSelector, useDispatch} from 'react-redux';
import {
  searchMedicineClear,
  searchMedicineRequest,
} from '../../../redux/action/userMedicine/searchMedicineAction';
import {TextInput} from 'react-native-paper';
import {faArrowLeft, faXmark} from '@fortawesome/free-solid-svg-icons';
import {ListItem} from 'react-native-elements';

const RenderModalView = ({setVisible, props}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.searchMedicine?.data);
  const error = useSelector(state => state.searchMedicine?.error);
  const loading = useSelector(state => state.searchMedicine?.isLoading);
  const [pageNo, setPageNo] = useState(0);
  const [tempSearch, setTempSearch] = useState([]);
  const [med, setMed] = useState('');

  const activityIndicator = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    );
  };

  useEffect(() => {
    if (res !== null) {
      setTempSearch(res);
    } else if (res === null) {
      setTempSearch([]);
    }
  }, [res]);

  useEffect(() => {
    if (med.length !== 0) {
      setTimeout(() => {
        dispatch(searchMedicineRequest({med, pageNo}));
      }, 1000);
    }
  }, [med]);

  const setData = item => {
    setVisible(false);
    dispatch(searchMedicineClear());
    props.setFieldValue('medicineName', item.medicineName);
    props.setFieldValue('description', item.description);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{marginTop: 4}}
        onPress={() => {
          setData(item);
        }}>
        <ListItem
          style={{marginHorizontal: 8}}
          hasTVPreferredFocus={undefined}
          tvParallaxProperties={undefined}>
          <ListItem.Content>
            <View style={{}}>
              <ListItem.Title
                style={{color: 'black', fontWeight: '600', fontSize: 16}}>
                <Text style={{fontWeight: 'bold'}}>Medicine : </Text>
                {item.medicineName}
              </ListItem.Title>
              <ListItem.Subtitle
                style={{color: 'black', fontWeight: '600', fontSize: 15}}>
                <Text style={{fontWeight: 'bold'}}>Description : </Text>
                {item.description}
              </ListItem.Subtitle>
            </View>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View
        style={{
          alignSelf: 'flex-start',
          marginTop: 16,
          marginLeft: 10,
          marginBottom: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setVisible(false);
            dispatch(searchMedicineClear());
          }}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={22}
            color={colorPalette.mainColor}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10, width: '96%'}}>
        <TextInput
          label="Search Medicine"
          mode="outlined"
          onChangeText={text => setMed(text)}
          outlineColor={colorPalette.mainColor}
          activeOutlineColor={colorPalette.mainColor}
          style={{width: '100%', alignSelf: 'center'}}
          value={med}
          right={
            <TextInput.Icon
              onPress={() => {
                setMed('');
                dispatch(searchMedicineClear());
              }}
              name={() => (
                <FontAwesomeIcon
                  size={20}
                  icon={faXmark}
                  color={colorPalette.mainColor}
                />
              )}
            />
          }
        />
      </View>
      {loading ? (
        activityIndicator()
      ) : (
        <>
          {error?.status === 404 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
                Medicine Not Found
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: '500',
                  marginTop: 10,
                }}>
                (Please Enter Manually)
              </Text>
            </View>
          ) : (
            <>
              {tempSearch.length === 0 ? (
                <></>
              ) : (
                <>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tempSearch}
                    renderItem={renderItem}
                    contentContainerStyle={{
                      flex: 1,
                      backgroundColor: colorPalette.backgroundColor,
                    }}
                    style={{width: '100%'}}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default RenderModalView;
