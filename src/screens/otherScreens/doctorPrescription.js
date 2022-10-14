import {View, Text, Modal, Animated} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import SubHeader from '../../components/molecules/headers/subHeader';
import {TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {Card, Divider} from 'react-native-paper';
import {styles} from '../../styles/otherScreensStyles/prescriptionsStyles';

const DoctorPrescription = ({navigation, route}) => {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []);

  const item = route.params.item;
  // console.log(item);
  const [visible, setVisible] = useState(false);
  const images = [
    {
      url: item?.prescriptionUrl,
    },
  ];
  return (
    <View style={styles.container1}>
      <SubHeader navigation={navigation}
      //  title={'Doctor Prescription'}
        />
      <View style={styles.lottieCont}>
        <LottieView
          style={styles.lottie}
          progress={progress}
          speed={0.6}
          source={require('../../assets/animation/addPrescription.json')}
        />
      </View>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(!visible)}>
        <ImageViewer imageUrls={images} />
      </Modal>
      <Card style={styles.card1}>
        <View style={styles.mainView}>
          <View style={styles.subCont}>
            <View style={styles.subView1}>
              <Text style={styles.heading}>Doctor Name</Text>
            </View>
            <View style={styles.subView2}>
              <Text style={styles.content}>{item.doctorName}</Text>
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
              <Text style={styles.content}>{item.location}</Text>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.subCont}>
            <View style={styles.subView1}>
              <Text style={styles.heading}>Specialization</Text>
            </View>
            <View style={styles.subView2}>
              <Text style={styles.content}>{item.specialization}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVisible(true)}
            style={styles.touchable}>
            <Text style={styles.btn}>View Prescription</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

export default DoctorPrescription;