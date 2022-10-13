import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import MedicineDetailCard from './medicineDetailCard';
import {verticalScale} from '../../../components/atoms/constant';
import {ScrollView} from 'react-native-gesture-handler';

const MedicineList = ({route, navigation}) => {
  const data = route.params.data;
  const WIDTH = Dimensions.get('screen').width;
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <SubHeader title={'Medicine Description'} navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousalView}>
            <Carousel
              layout="default"
              layoutCardOffset={19}
              ref={isCarousel}
              data={data}
              centerContent={true}
              renderItem={MedicineDetailCard}
              sliderWidth={WIDTH}
              horizontal={true}
              itemWidth={WIDTH / 1.1}
              onSnapToItem={index => {
                setIndex(index);
              }}
              useScrollView={true}
              scrollEnabled={true}
              activeSlideAlignment="center"
              swipeThreshold={0.0003}
              enableSnap={true}
              activeSlideOffset={20}
              snapToInterval={3}
              enableMomentum={true}
              scrollEndDragDebounceValue={9000}
            />
          </View>
        </View>
        <View style={styles.pagingContainer}>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 8,
              backgroundColor: 'black',
            }}
            dotContainerStyle={{
              borderWidth: 2,
              borderColor: '#f0f0f0',
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={0.6}
            dotColor={colorPalette.appColor}
            inactiveDotColor={'grey'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicineList;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colorPalette.backgroundColor,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: HEIGHT - verticalScale(56),
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  carousalView: {backgroundColor: '#f0f0f0'},
  pagingContainer: {
    position: 'absolute',
    bottom: 30,
    height: 20,
    marginBottom: 20,
  },
  headerView: {width: '100%'},
});


