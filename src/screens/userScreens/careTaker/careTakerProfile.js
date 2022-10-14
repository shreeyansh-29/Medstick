import {View, Image, ImageBackground, Text} from 'react-native';
import React from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {styles} from '../../../styles/careTakerStyles/careTakerProfileStyles';
import {Card, Divider} from 'react-native-paper';
import Loader from '../../../components/atoms/loader';

const CareTakerProfile = ({navigation, route}) => {
  const item = route.params.profile;
  return (
    <>
      <ImageBackground
        source={require('../../../assets/images/background5.png')}
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <SubHeader navigation={navigation} />
        {item === null ? (
          <Loader />
        ) : (
          <>
            <View style={styles.imgCont}>
              <Image source={{uri: item.picPath}} style={styles.img} />
            </View>
            <View
              style={{
                marginVertical: 4,
                alignItems: 'center',
                width: '60%',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: '500',
                }}>
                {item.userName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 6,
                  textAlign: 'center',
                  color: 'grey',
                  fontWeight: '400',
                }}>
                {item.email}
              </Text>
            </View>
            <Card style={styles.card1}>
              <View style={styles.mainView}>
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
                    <Text style={styles.content}>{item.dateOfBirth}</Text>
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
          </>
        )}
      </ImageBackground>
    </>
  );
};

export default CareTakerProfile;
