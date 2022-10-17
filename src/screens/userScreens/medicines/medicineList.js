import {View, Dimensions, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useRef} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import MedicineDetailCard from './medicineDetailCard';
import {deviceWidth, verticalScale} from '../../../components/atoms/constant';

const MedicineList = ({route, navigation}) => {
  const data = route.params.data;
  const [index, setIndex] = useState(route.params.index);
  const isCarousel = useRef(null);
  return (
    <View style={styles.container}>
      <SubHeader title={'Medicine Description'} navigation={navigation} />
      <View style={styles.carouselContainer}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          centerContent={true}
          renderItem={MedicineDetailCard}
          sliderWidth={deviceWidth}
          horizontal={true}
          itemWidth={deviceWidth / 1.1}
          onSnapToItem={index => {
            setIndex(index);
          }}
          useScrollView={true}
          scrollEnabled={true}
          activeSlideAlignment="center"
          enableSnap={true}
          activeSlideOffset={20}
          snapToInterval={3}
          enableMomentum={true}
          scrollEndDragDebounceValue={9000}
          inactiveSlideShift={0}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 8,
            backgroundColor: 'black',
            marginTop: -60,
          }}
          dotContainerStyle={{
            borderWidth: 2,
            borderColor: '#f0f0f0',
            backgroundColor: 'white',
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={0.6}
          dotColor={colorPalette.appColor}
          inactiveDotColor={'grey'}
        />
      </View>
    </View>
  );
};

export default MedicineList;
const HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.backgroundColor,
    alignItems: 'center',
    flex: 1,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    backgroundColor: colorPalette.backgroundColor,
  },
});
