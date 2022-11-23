import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {faXmarkCircle} from '@fortawesome/free-regular-svg-icons';
import {Icon, SearchBar} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {searchMedicineRequest} from '../../../redux/action/userMedicine/searchMedicineAction';

const RenderModalView = props => {
  const dispatch = useDispatch();
  const searchMedicine = useSelector(state => state.searchMedicine?.data);
  // console.log(searchMedicine);
  const loading = useSelector(state => state.searchMedicine?.isLoading);

  const activityIndicator = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    );
  };

  useEffect(() => {
    // if (searchMedicine.data !== null) {
    //   setTempSearch(searchMedicine.data);
    // }
  }, [searchMedicine]);

  const search = data => {
    dispatch(searchMedicineRequest(data));
  };

  const setData = item => {
    props.setVisible(false);
    props.values.medicineName(item?.medicineName);
    props.values.description(item?.description);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <ListItem style={styles.list}>
          <ListItem.Content>
            <View style={{padding: 2}}>
              <TouchableOpacity onPress={() => setData(item)}>
                <View style={{flexDirection: 'row'}}>
                  <ListItem.Subtitle>
                    <Text
                      style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
                      {'Medicine Name: '}
                    </Text>
                    {`${item.medicineName}`}
                    {','}
                  </ListItem.Subtitle>
                </View>

                <ListItem.Subtitle>
                  <Text
                    style={{fontSize: 15, fontWeight: '700', color: '#000'}}>
                    {'Description: '}
                  </Text>
                  {`${item.description}`}
                </ListItem.Subtitle>
              </TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
        <Divider />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{alignSelf: 'flex-end', marginTop: 8, marginRight: 12}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.setVisible(false);
          }}>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            size={26}
            color={colorPalette.mainColor}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10}}>
        <SearchBar
          platform="default"
          placeholder="Search Medicine"
          value={props.values.medicineName}
          onChangeText={text => {
            console.log(text);
            props.handleChange(text);
            search(text);
          }}
          containerStyle={{
            backgroundColor: 'rbga(225,232,238,0)',
          }}
          inputContainerStyle={{
            borderRadius: 30,
            backgroundColor: '#EFF5F5',
            height: 50,
          }}
          inputStyle={{
            fontSize: 18,
            color: colorPalette.mainColor,
          }}
          lightTheme="true"
          placeholderTextColor={colorPalette.mainColor}
          clearIcon={{color: colorPalette.mainColor, size: 22}}
          searchIcon={
            <Icon
              size={22}
              name="search"
              type="font-awesome"
              color={colorPalette.mainColor}
              // onPress={() => handleSubmit()}
              containerStyle={{marginLeft: 10}}
            />
          }
        />
      </View>
      {loading ? (
        activityIndicator()
      ) : (
        <>
          {searchMedicine ? (
            <></>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchMedicine}
              renderItem={renderItem}
              numColumns={1}
            />
          )}
        </>
      )}
    </View>
  );
};

export default RenderModalView;
