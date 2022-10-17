import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../components/atoms/constant';
import {colorPalette} from '../../../components/atoms/colorPalette';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faNoteSticky} from '@fortawesome/free-regular-svg-icons';

const MedicineDetailCard = ({item, index, navigation}) => {
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
                onPress={() => {
                  console.log('abcd');
                }}>
                <FontAwesomeIcon
                  icon={faPencil}
                  size={20}
                  color={colorPalette.basicColor}
                />
              </TouchableOpacity>
              <TouchableOpacity>
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
                  <Text style={styles.itemData}>{item.description}</Text>
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
                  <Text style={styles.itemHeading}>Dosage Unit : </Text>
                </View>
                <View style={styles.itemWidth}>
                  <Text style={styles.itemData}>{item.dosageUnit}</Text>
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

export default MedicineDetailCard;

const styles = StyleSheet.create({
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
    justifyContent: 'center',
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
