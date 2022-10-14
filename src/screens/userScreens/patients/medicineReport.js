import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../../../components/molecules/headers/subHeader';
import {colorPalette} from '../../../components/atoms/colorPalette';
import PerformanceCircle from '../../../components/organisms/performanceCircle';
import {verticalScale} from '../../../components/atoms/constant';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getMedsRequest} from '../../../redux/action/patients/getMedsAction';
import AdherencePercentage from './adherenceHistory';
import {Button, Divider} from 'react-native-elements';
import styles from '../../../styles/patientStyles/medicineReportStyles';
import LottieView from 'lottie-react-native';
import HistoryDetail from '../../../components/organisms/historyDetail';

var weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Reminder = ({item, index}) => {
  console.log(item, 'ite');
  const nottaken = item.notTaken.split(',');
  const taken = item.taken.split(',');
  let tl, nt;
  nt = nottaken[0] === '' ? 0 : nottaken.length;
  tl = taken[0] === '' ? 0 : taken.length;
  return (
    <Animatable.View animation="slideInLeft" duration={500} delay={index * 180}>
      <>
        <Card key={'2'} style={styles.dateday}>
          <View key={'3'} style={styles.cardView}>
            <View style={styles.dateView}>
              <Text key={'7'} style={styles.date}>
                Date - {item.date}
              </Text>
            </View>
            {
              <View style={styles.progressView}>
                <ProgressCircle
                  percent={Math.round((tl / (tl + nt)) * 100)}
                  radius={20}
                  borderWidth={3}
                  color="#4dd0e1"
                  shadowColor="#e3f2fd"
                  bgColor="#fff">
                  <Text style={styles.progressText}>
                    {Math.round((tl / (tl + nt)) * 100) + '%'}
                  </Text>
                </ProgressCircle>
              </View>
            }
          </View>
          <Divider style={styles.divider} />
          {nottaken.map(nti => {
            return (
              nti !== '' && (
                <View key={'4'} style={styles.notTakenView}>
                  <Text key={'5'}>{nti}</Text>
                  <Text key={'6'} style={styles.notTakenText}>
                    Not Taken
                  </Text>
                </View>
              )
            );
          })}
          {taken.map(tti => {
            return (
              tti !== '' && (
                <View key={'12' + tti} style={styles.notTakenView}>
                  <Text key={'22'}>{tti}</Text>
                  <Text key={'23'} style={styles.takenText}>
                    {' '}
                    Taken
                  </Text>
                </View>
              )
            );
          })}
        </Card>
      </>
    </Animatable.View>
  );
};

const MedicineReport = ({navigation, route}) => {
  const item = route?.params?.item;
  const {startDate, days, currentCount, reminderTime, endDate} =
    item?.userMedicineReminder;
  console.log(item?.userMedicineReminder);
  const dispatch = useDispatch();
  const res = useSelector(state => state.getMedicines);
  const [historyData, setHistoryData] = useState([]);
  const [adherence, setAdherence] = useState(0);
  console.log(adherence);
  const [showDetail, showDetailState] = useState(false);
  const [allDates, setAllDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (res?.data?.status === 'OK') {
      setHistoryData(res?.data?.result);
      showAllDates;
      AdherencePercentage(startDate, days, reminderTime, 5, '').then(per =>
        setAdherence(per),
      );
    }
  }, [res]);

  const showDetailfun = sDate => {
    let detailData = historyData.find(el => el.date === sDate);
    console.log(detailData);
    if (detailData === undefined) {
      ToastAndroid.show('Not available', ToastAndroid.LONG);
      return;
    }
    showDetailState(true);
    setModalVisible(true);
  };

  function modalVisibilityfun() {
    showDetailState(false);
    setModalVisible(false);
  }

  const showAllDates = () => {
    let alldates = [];
    let msd = new Date(startDate),
      mld = new Date(endDate);
    let daysSet = new Set(days?.split(','));
    let todayDate = new Date();
    while (msd <= mld) {
      if (daysSet.has(weeks[msd.getDay()])) {
        let currentDate = new Date(msd);
        const dateObj = {day: '', date: '', month: 0, color: '', year: 0};
        dateObj.day = weeks[currentDate.getDay()];
        dateObj.date = currentDate.getDate().toString();
        dateObj.month = currentDate.getMonth();
        dateObj.color = currentDate < todayDate ? '#e3f2fd' : '#4dd0e1';
        dateObj.year = currentDate.getFullYear();
        alldates.push(dateObj);
      }
      msd.setDate(msd.getDate() + 1);
    }
    setAllDates(alldates);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMedsRequest(item?.userMedicineId));
      return () => {
        true;
      };
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorPalette.mainColor,
      }}>
      <SubHeader navigation={navigation} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}>
        <View style={styles.detailView}>
          {showDetail ? (
            <HistoryDetail
              data={detailData}
              modalVisibility={modalVisibilityfun}
            />
          ) : (
            <LottieView
              style={styles.lottie}
              speed={0.8}
              source={require('../../../assets/animation//noMed1.json')}
              autoPlay
              loop
            />
          )}
        </View>
      </Modal>
      <View style={{backgroundColor: 'white', marginVertical: 8}}>
        <PerformanceCircle
          styles={style}
          radius={52}
          borderWidth={8}
          percent={2}
          text={item?.medicineName}
        />
      </View>
      <View
        style={{
          backgroundColor: colorPalette.backgroundColor,
          width: '100%',
          flex: 1,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}>
        <View style={{height: 130, alignItems: 'center', marginTop: 18}}>
          <Text
            style={{
              fontWeight: '500',
              marginBottom: 8,
              fontSize: 16,
              color: 'black',
            }}>
            Scheduled Dates for {item?.medicineName}
          </Text>
          <ScrollView horizontal={true}>
            {allDates.map(mCurrentDate => {
              return (
                <View style={styles.dayView}>
                  <Text style={styles.dayText}>{mCurrentDate.day}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      showDetailfun(
                        mCurrentDate.date +
                          '-' +
                          (mCurrentDate.month + 1) +
                          '-' +
                          mCurrentDate.year,
                      )
                    }>
                    <View
                      style={{
                        flexDirection: 'column',
                        marginRight: 10,
                        marginLeft: 10,
                        padding: 13,
                        width: 70,
                        alignItems: 'center',
                        borderRadius: 60,
                        justifyContent: 'center',
                        backgroundColor: '#02a6ab',
                      }}>
                      <Text style={styles.dateText}>{mCurrentDate.date}</Text>
                      <Text style={styles.monthText}>
                        {months[mCurrentDate.month]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Text
          style={{
            marginLeft: 10,
            marginTop: 8,
            fontWeight: '600',
            textAlign: 'center',
            fontSize: 18,
            color: 'grey',
          }}>
          Medicine History
        </Text>
        <FlatList
          data={historyData}
          renderItem={({item, index}) => {
            return <Reminder item={item} index={index} />;
          }}
        />
        <Button
          title={'Download PDF'}
          titleStyle={styles.buttonTitle}
          // onPress={async () => {
          //   await PermissionsAndroid.request(
          //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          //   );
          //   await PermissionsAndroid.request(
          //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          //   );
          //   setModalVisible(true);
          //   const downloadResp = await Downloadpdf(medId);
          //   setModalVisible(false);
          //   if (downloadResp !== 'err') {
          //     ToastAndroid.show('Downloaded successfully', ToastAndroid.LONG);
          //   } else {
          //     ToastAndroid.show('Error while downloading', ToastAndroid.LONG);
          //   }
          // }}
          buttonStyle={styles.button}>
          Download PDF
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  performanceContainer: {
    alignItems: 'center',
    padding: verticalScale(12),
    backgroundColor: colorPalette.mainColor,
  },
  outerCircle: {marginTop: verticalScale(4)},
  percentage: {fontSize: 18, color: colorPalette.redPercentageColor},
  performance: {
    // color: colorPalette.mainColor,
    color: '#fff',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
    fontSize: 24,
    // paddingTop: 10,
  },
  color: colorPalette.redPercentageColor,
  shadowColor: colorPalette.restPercentageColor,
  bgColor: colorPalette.basicColor,
});

export default MedicineReport;
