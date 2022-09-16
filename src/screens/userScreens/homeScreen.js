import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainHeader from '../../components/molecules/headers/mainHeader';
import Calender from '../../components/organisms/calender';
import PerformanceCircle from '../../components/organisms/performanceCircle';
import Reminders from './reminders';
import * as Animatable from 'react-native-animatable';
import {colorPalette} from '../../components/atoms/colorPalette';
import {styles} from '../../styles/homeScreenStyles/performanceCircleStyles';
import {Card} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faEllipsisVertical,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const medicines = [
  {name: 'Paracetamol', dose: '200mg'},
  {name: 'Paracetamol', dose: '200mg'},
  {name: 'Paracetamol', dose: '200mg'},
];

const HomeScreen = ({navigation}) => {
  return (
    <>
      <MainHeader navigation={navigation} title={'Medstick'} />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 20,
              borderColor: 'white',
              marginTop: 16,
              width: '92%',
              borderWidth: 1,
              shadowColor: 'black',
              elevation: 4,
            }}>
            <Calender />
            <PerformanceCircle styles={styles} />
          </View>
          <View
            style={{
              borderRadius: 20,
              borderColor: 'white',
              marginTop: 16,
              width: '92%',
              borderWidth: 1,
              shadowColor: 'black',
              elevation: 4,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                paddingLeft: 24,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: colorPalette.basicColor,
                color: colorPalette.mainColor,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
              }}>
              Reminders
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                borderBottomStartRadius: 18,
                borderBottomEndRadius: 18,
              }}>
              <Image
                resizeMode="contain"
                style={{height: 280, width: 192}}
                source={require('../../assets/images/noremtoday.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderRadius: 20,
              borderColor: 'white',
              marginTop: 16,
              width: '92%',
              borderWidth: 1,
              shadowColor: 'black',
              elevation: 4,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                paddingLeft: 18,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: colorPalette.basicColor,
                color: colorPalette.mainColor,
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
              }}>
              Reminders
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                borderBottomStartRadius: 18,
                borderBottomEndRadius: 18,
              }}>
              <View
                style={{
                  height: 400,
                  width: '100%',
                }}>
                <Animatable.View
                  animation="zoomInUp"
                  duration={400}
                  style={{
                    height: '100%',
                    alignItems: 'center',
                  }}>
                  <Card
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      borderRadius: 20,
                      width: '90%',
                      height: '20%',
                      marginTop: 12,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 20,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 0.8,
                          borderTopStartRadius: 20,
                          borderBottomStartRadius: 20,
                        }}>
                        <View
                          style={{
                            marginLeft: 12,
                            marginVertical: 6,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            8:00 AM
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              color: 'grey',
                            }}>
                            Paracetamol
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: 'grey',
                            }}>
                            Dosage : 0
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: 'grey',
                            }}>
                            Status: Taken
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          borderBottomEndRadius: 20,
                          borderTopRightRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => {}}>
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            size={24}
                            color={colorPalette.mainColor}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>

                  <Card
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: 'lightgrey',
                      borderRadius: 20,
                      width: '90%',
                      height: '20%',
                      marginTop: 12,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 20,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 0.8,
                          borderTopStartRadius: 20,
                          borderBottomStartRadius: 20,
                        }}>
                        <View
                          style={{
                            marginLeft: 12,
                            marginVertical: 6,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: 'black',
                            }}>
                            8:00 AM
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '700',
                              color: 'grey',
                            }}>
                            Paracetamol
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: 'grey',
                            }}>
                            Dosage : 0
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: 'grey',
                            }}>
                            Status: Taken
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          borderBottomEndRadius: 20,
                          borderTopRightRadius: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => {}}>
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            size={24}
                            color={colorPalette.mainColor}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                </Animatable.View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>

    // <View style={{flex: 1}}>
    //   <MainHeader navigation={navigation} title={'MEDSTICK'} />
    //   <View
    //     style={{
    //       flex: 0.35,
    //       backgroundColor: colorPalette.appColor,
    //       borderBottomLeftRadius: 24,
    //       borderBottomRightRadius: 24,
    //     }}>
    //     <View
    //       style={{
    //         borderRadius: 20,
    //         borderColor: 'white',
    //         position: 'absolute',
    //         marginTop: 16,
    //         width: '92%',
    //         borderWidth: 1,
    //         left: 14,
    //         shadowColor: 'black',
    //         elevation: 8,
    //       }}>
    //       <Calender />
    //       <PerformanceCircle styles={styles} />
    //     </View>
    //   </View>
    //   <View
    //     style={{
    //       top: '12%',
    //       flex: 0.5,
    //       borderRadius: 20,
    //       left: 14,
    //       width: '92%',
    //     }}>
    //     <Text
    //       style={{
    //         fontSize: 20,
    //         paddingLeft: 24,
    //         paddingTop: 12,
    //         paddingBottom: 12,
    //         backgroundColor: colorPalette.basicColor,
    //         color: colorPalette.mainColor,
    //         borderTopLeftRadius: 20,
    //         borderTopRightRadius: 20,
    //       }}>
    //       Reminders
    //     </Text>
    //     <View
    //       style={{
    //         backgroundColor: 'white',
    //         alignItems: 'center',
    //         borderBottomStartRadius: 20,
    //         borderBottomEndRadius: 20,
    //       }}>
    //       <Image
    //         resizeMode="contain"
    //         style={{height: 280, width: 192}}
    //         source={require('../../assets/images/noremtoday.png')}
    //       />
    //     </View>
    //   </View>
    // </View>
  );
};

export default HomeScreen;
