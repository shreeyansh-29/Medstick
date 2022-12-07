import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
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
import {
  faArrowLeft,
  faSearch,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {ListItem} from 'react-native-elements';

const RenderModalView = ({setVisible, props}) => {
  const dispatch = useDispatch();
  const res = useSelector(state => state.searchMedicine?.data);
  const error = useSelector(state => state.searchMedicine?.error?.data);
  const [pageNo, setPageNo] = useState(0);
  const [tempSearch, setTempSearch] = useState([]);
  const [med, setMed] = useState('');
  const [loading, setLoading] = useState(true);

  const activityIndicator = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colorPalette.mainColor} />
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (res !== null) {
      setTempSearch([...tempSearch, ...res]);
    }
  }, [res]);

  const apiCall = () => {
    if (med.length !== 0) {
      let medicineName = med.trim();
      dispatch(searchMedicineRequest({medicineName, pageNo}));
    }
  };

  const onEnd = () => {
    let a = pageNo + 1;
    if (tempSearch.length % 8 === 0 && a !== 0 && res?.length !== 0) {
      apiCall(med, a);
    }
    setPageNo(a);
  };

  const setData = item => {
    setVisible(false);
    dispatch(searchMedicineClear());
    props.setFieldValue('medicineName', item.medicineName);
    props.setFieldValue('description', item.description);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
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
    <View style={styles.container}>
      <View style={styles.backBtnCont}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setVisible(false);
            dispatch(searchMedicineClear());
            setPageNo(0);
            setTempSearch([]);
          }}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={22}
            color={colorPalette.mainColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <TextInput
          placeholder="Search Medicine"
          mode="outlined"
          onChangeText={text => {
            setMed(text);
            setTempSearch([]);
            setPageNo(0);
          }}
          outlineColor={colorPalette.mainColor}
          activeOutlineColor={colorPalette.mainColor}
          style={styles.field}
          value={med}
          right={
            med.length !== 0 ? (
              <TextInput.Icon
                onPress={() => apiCall()}
                name={() => (
                  <FontAwesomeIcon
                    size={20}
                    icon={faSearch}
                    color={colorPalette.mainColor}
                  />
                )}
              />
            ) : null
          }
          left={
            <TextInput.Icon
              onPress={() => {
                setMed('');
                dispatch(searchMedicineClear());
                setPageNo(0);
                setTempSearch([]);
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
          clearTextOnFocus={true}
        />
      </View>
      {loading ? (
        activityIndicator()
      ) : (
        <>
          {error?.status === 'Failed' ? (
            <View style={styles.errorCont}>
              <Text style={styles.text1}>Medicine Not Found</Text>
              <Text style={styles.text2}>(Please Enter Manually)</Text>
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
                      backgroundColor: colorPalette.backgroundColor,
                    }}
                    style={{width: '100%'}}
                    onEndReached={onEnd}
                    onEndReachedThreshold={0.01}
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

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', alignItems: 'center'},
  backBtnCont: {
    alignSelf: 'flex-start',
    marginTop: 16,
    marginLeft: 10,
    marginBottom: 2,
  },
  textContainer: {marginVertical: 10, width: '96%'},
  field: {width: '100%', alignSelf: 'center'},
  errorCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text1: {color: 'black', fontSize: 20, fontWeight: '500'},
  text2: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
  },
  loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default RenderModalView;
