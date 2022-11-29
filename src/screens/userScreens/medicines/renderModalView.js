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
import {faXmarkCircle} from '@fortawesome/free-regular-svg-icons';
import {useSelector, useDispatch} from 'react-redux';
import {
  searchMedicineClear,
  searchMedicineRequest,
} from '../../../redux/action/userMedicine/searchMedicineAction';
import {TextInput} from 'react-native-paper';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {ListItem} from 'react-native-elements';

const RenderModalView = ({setVisible, setMed, setDescription}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.searchMedicine?.data);
  const status = useSelector(state => state.searchMedicine?.error);
  const loading = useSelector(state => state.searchMedicine?.isLoading);
  const [pageNo, setPageNo] = useState(0);
  const [tempSearch, setTempSearch] = useState([]);
  const [med, setMed1] = useState('');

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

  const search = data => {
    dispatch(searchMedicineRequest({data, pageNo}));
  };

  const setData = item => {
    setVisible(false);
    setMed(item.medicineName);
    setDescription(item.description);
    dispatch(searchMedicineClear());
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
      <View style={{alignSelf: 'flex-end', marginTop: 8, marginRight: 12}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setVisible(false);
            dispatch(searchMedicineClear());
          }}>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            size={26}
            color={colorPalette.mainColor}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10, width: '96%'}}>
        <TextInput
          label="Search Medicine"
          mode="outlined"
          onChangeText={text => {
            setMed1(text);
            search(text);
          }}
          outlineColor={colorPalette.mainColor}
          activeOutlineColor={colorPalette.mainColor}
          style={{width: '100%', alignSelf: 'center'}}
          value={med}
          right={
            <TextInput.Icon
              onPress={() => {
                setMed1('');
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
          {status === 404 ? (
            <>
              <Text>Medicine Not Found</Text>
            </>
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
