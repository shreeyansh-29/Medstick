import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {faNoteSticky} from '@fortawesome/free-regular-svg-icons';
import {deviceWidth} from '../../../components/atoms/constant';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import CustomModal from '../../../components/molecules/customModal';
import EditNotes from './editNotes';
import EditMedicineView from './editMedicineView';

const MedicineList = ({route, navigation}) => {
  const data = route.params?.data;
  const [index, setIndex] = useState(route.params?.index);
  const isCarousel = useRef(null);
  const [visible, setVisible] = useState(false);
  const [userMedicineId, setUserMedicineId] = useState('');
  const [edit, setEdit] = useState(false);
  const [medData, setMedData] = useState('');

  const MedicineDetailCard = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.container} key={index}>
          <View style={styles.top}>
            <View style={styles.medNameContainer}>
              <View style={styles.medNameView}>
                <Text style={styles.medName}>{item.medicineName}</Text>
              </View>
              <View style={styles.iconView}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setEdit(true);
                    setMedData(item);
                  }}>
                  <FontAwesomeIcon
                    icon={faPencil}
                    size={20}
                    color={colorPalette.basicColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    setVisible(true);
                    setUserMedicineId(item?.userMedicineId);
                  }}>
                  <FontAwesomeIcon
                    icon={faNoteSticky}
                    size={20}
                    color={colorPalette.basicColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <View style={{paddingHorizontal: 15}}>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Description : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>
                      {item.medicineDescription}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Dosage Type : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.dosageQuantity}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Dosage Power : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.dosagePower}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Total Stock : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.stock}</Text>
                  </View>
                </View>
                <View style={styles.prescriptionContainer}>
                  <View style={styles.prescriptionView}>
                    <Text style={styles.prescriptionText}>
                      Prescription Details
                    </Text>
                  </View>
                  <View style={styles.line}></View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Doctor Name : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.doctorName}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Contact : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.contact}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Specialization : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.specialization}</Text>
                  </View>
                </View>
                <View style={styles.itemView}>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemHeading}>Loaction : </Text>
                  </View>
                  <View style={styles.itemWidth}>
                    <Text style={styles.itemData}>{item.location}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return edit ? (
    <EditMedicineView
      item={medData}
      setEdit={setEdit}
      navigation={navigation}
    />
  ) : (
    <View style={styles.container1}>
      <SubHeader title={'Medicine Description'} navigation={navigation} />
      <CustomModal
        type="fade"
        modalVisible={visible}
        onRequestClose={() => setVisible(!visible)}
        modalView={
          <EditNotes userMedicineId={userMedicineId} setVisible={setVisible} />
        }
      />
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

const styles = StyleSheet.create({
  container1: {
    backgroundColor: colorPalette.backgroundColor,
    flex: 1,
  },
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    backgroundColor: colorPalette.backgroundColor,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colorPalette.backgroundColor,
  },
  top: {
    backgroundColor: colorPalette.backgroundColor,
    width: '100%',
    borderRadius: 10,
    height: '92%',
    elevation: 2,
    opacity: 1,
  },
  medNameContainer: {
    backgroundColor: colorPalette.appColor,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'space-evenly',
  },
  medNameView: {width: '70%', left: 10},
  iconView: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-evenly',
  },
  medName: {fontSize: 20, fontWeight: '600', color: colorPalette.basicColor},
  itemHeading: {fontSize: 16, fontWeight: '600', color: 'grey'},
  itemWidth: {width: '50%'},
  itemView: {flexDirection: 'row', paddingVertical: 12, width: '100%'},
  itemData: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
  },
  line: {height: 1, width: '90%', backgroundColor: 'grey', marginTop: 4},
  prescriptionContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  prescriptionView: {
    width: '100%',
  },
  prescriptionText: {fontSize: 21},
});

// {
//   navigation?.navigate('AddMedicineStack', {
//     screen: 'AddMedicine',
//     params: {
//       itemDescription: item.medicineDescription,
//       itemDosageType: item.dosageQuantity,
//       itemDosageUnit: item.dosageUnit,
//       Stock: item.stock,
//       doctorName: item.doctorName,
//       contact: item.contact,
//       specialization: item.specialization,
//       loaction: item.location,
//     },
//   });
// }
