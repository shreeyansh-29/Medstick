import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {medicineImagesRequest} from '../../../redux/action/patients/medicineImagesAction';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import {FETCH_IMAGE} from '../../../constants/apiUrl';
import Loader from '../../../components/atoms/loader';
import CustomImage from '../../../components/atoms/customImage';
import {colorPalette} from '../../../components/atoms/colorPalette';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.84);

const CarouselCardItem = ({item}) => {
  const [load, setload] = useState(true);
  return (
    <View style={styles.container1}>
      <Image
        source={{
          uri: `${FETCH_IMAGE}/upload/static/images/${item?.imageUrl}`,
        }}
        style={styles.image}
        onLoadStart={() => setload(true)}
        onLoadEnd={() => setload(false)}
      />
      <Text style={styles.header}>{item.time}</Text>
      {load && <ActivityIndicator />}

      <View style={styles.bodyView}>
        <Text style={styles.body}>{item.caretakerName}</Text>
        <Text style={styles.body}>{item.date}</Text>
      </View>
    </View>
  );
};

const SingleImageComponent = ({item}) => {
  const [index, setindex] = useState(0);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.date}>{item[0].date}</Text>
      </View>
      <View style={styles.carousel}>
        <Carousel
          layoutCardOffset={9}
          data={item}
          onSnapToItem={inde => setindex(inde)}
          renderItem={({item}) => <CarouselCardItem item={item} />}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
        />
        <Pagination
          dotsLength={item.length}
          activeDotIndex={index}
          containerStyle={styles.pageContainer}
          dotStyle={styles.pageDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </>
  );
};

const MedicineImages = ({navigation, route}) => {
  const [imageData, setImageData] = useState([]);
  const medId = route?.params?.item;
  const dispatch = useDispatch();
  let res = useSelector(state => state.medicineImages);
  let loading = useSelector(state => state.medicineImages?.isLoading);

  useEffect(() => {
    if (res?.data !== null) {
      let response = res?.data?.imageList;
      let map = new Map();
      for (let re = 0; re < response.length; re++) {
        if (map.has(response[re].date)) {
          map.get(response[re].date).push(response[re]);
        } else {
          let newArr = [];
          newArr.push(response[re]);
          map.set(response[re].date, newArr);
        }
      }
      let Arr = [];
      map.forEach(it => Arr.push(it));
      setImageData(Arr);
    }
  }, [res]);

  const fetchImages = () => {
    dispatch(medicineImagesRequest(medId));
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchImages();
      return () => {};
    }, []),
  );

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <SubHeader navigation={navigation} title={'Medicine Images'} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {imageData.length === 0 ? (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomImage
                styles={{width: '80%'}}
                resizeMode="contain"
                source={require('../../../assets/images/noImagesPatient.png')}
              />
            </View>
          ) : (
            <>
              <FlatList
                data={imageData}
                renderItem={({item}) => <SingleImageComponent item={item} />}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    width: ITEM_WIDTH,
    shadowColor: '#000',
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 2,
  },
  image: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 10,
  },
  header: {
    color: '#222',
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  bodyView: {flexDirection: 'row', justifyContent: 'space-between'},
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },

  //main
  container: {
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  date: {fontSize: 18, fontWeight: '700', color: 'grey'},
  carousel: {height: 340, backgroundColor: 'white'},
  pageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colorPalette.mainColor,
  },
  pageContainer: {
    position: 'relative',
  },
  inactiveDot: {
    backgroundColor: 'black',
    // Define styles for inactive dots here
  },
});

export default MedicineImages;
