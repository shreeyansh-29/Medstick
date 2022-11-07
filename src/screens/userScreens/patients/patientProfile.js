import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {styles} from '../../../styles/patientStyles/patientProfileStyles';
import {Card, Divider} from 'react-native-paper';
import {colorPalette} from '../../../components/atoms/colorPalette';
import ErrorBoundary from 'react-native-error-boundary';

const PatientProfile = ({navigation, route}) => {
  const dateHandler = date => {
    let dob = date.split('-');
    return dob[2] + '-' + dob[1] + '-' + dob[0];
  };
  const item = route.params.profile;

  return item === null ? (
    <>
      <ErrorBoundary />
    </>
  ) : (
    <>
      <View style={{flex: 1, backgroundColor: colorPalette.backgroundColor}}>
        <SubHeader title={'Patient Profile'} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={require('../../../assets/images/background3.png')}
            style={styles.mainCont}>
            <View style={styles.imgCont}>
              <Image source={{uri: item.picPath}} style={styles.img} />
            </View>
            <View style={styles.userDetialsCont}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <Card style={styles.card1}>
              <View style={styles.mainView}>
                <View style={styles.subCont}>
                  <View style={styles.subView1}>
                    <Text style={styles.heading}>Bio</Text>
                  </View>
                  <View style={styles.subView2}>
                    <Text style={styles.content}>{item.bio}</Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.subCont}>
                  <View style={styles.subView1}>
                    <Text style={styles.heading}>Contact No</Text>
                  </View>
                  <View style={styles.subView2}>
                    <Text style={styles.content}>{item.contact}</Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.subCont}>
                  <View style={styles.subView1}>
                    <Text style={styles.heading}>Location</Text>
                  </View>
                  <View style={styles.subView2}>
                    <Text style={styles.content}>
                      {item.address + ', ' + item.state + ', ' + item.country}
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.subCont}>
                  <View style={styles.subView1}>
                    <Text style={styles.heading}>DOB</Text>
                  </View>
                  <View style={styles.subView2}>
                    <Text style={styles.content}>
                      {dateHandler(item.dateOfBirth)}
                    </Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.subCont}>
                  <View style={styles.subView1}>
                    <Text style={styles.heading}>Blood Group</Text>
                  </View>
                  <View style={styles.subView2}>
                    <Text style={styles.content}>{item.bloodGroup}</Text>
                  </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.subCont}>
                  <View style={styles.subView1}>
                    <Text style={styles.heading}>Gender</Text>
                  </View>
                  <View style={styles.subView2}>
                    <Text style={styles.content}>{item.gender}</Text>
                  </View>
                </View>
              </View>
            </Card>
            <View style={styles.bottomCont}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('PatientMedicines', {item: item});
                }}>
                <Text style={styles.viewMed}>View Medicines</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('PatientPrescriptions', {
                    id: item.userId,
                  });
                }}>
                <Text style={styles.viewPres}>View Prescriptions</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    </>
  );
};

export default PatientProfile;
