import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colorPalette} from '../../../components/atoms/colorPalette';
import SubHeader from '../../../components/molecules/headers/subHeader';
import PerformanceCircle from '../../../components/organisms/performanceCircle';
import {PermissionsAndroid} from 'react-native';
import Downloadpdf from '../../../components/organisms/downloadPdf';
import {Divider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getMedsHistoryRequest} from '../../../redux/action/patients/getMedsHistoryAction';
import Reminder from './medicineReminders';
import {weeks, months, month} from '../../../constants/constants';
import styles from '../../../styles/patientStyles/medicineReportStyles';
import LottieView from 'lottie-react-native';
import HistoryDetail from './historyDetail';
import CustomModal from '../../../components/molecules/customModal';

let detailData = {};

const MedicineReport = ({navigation, route}) => {
  const dispatch = useDispatch();
  const item = route?.params?.item;
  const {startDate, days, currentCount, reminderTime, endDate} = item;
  const res = useSelector(state => state.getMedsHistory?.data);
  const [historyData, setHistoryData] = useState([]);
  const [allDates, setAllDates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showDetail, showDetailState] = useState(false);

  useEffect(() => {
    if (res?.status === 'OK') {
      setHistoryData(res?.result);
      showAllDates();
      // AdherencePercentage(startDate, days, reminderTime, currentCount, '').then(
      //   per => setAdherence(per),
      // );
    }
  }, [res]);

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
        dateObj.day = weeks[currentDate.getDay()].slice(0, 3);
        dateObj.date = currentDate.getDate().toString();
        dateObj.month = months[currentDate.getMonth()];
        dateObj.color =
          currentDate < todayDate
            ? colorPalette.mainColor
            : colorPalette.lightWhite;
        dateObj.year = currentDate.getFullYear();
        alldates.push(dateObj);
      }
      msd.setDate(msd.getDate() + 1);
    }
    setAllDates(alldates);
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMedsHistoryRequest(item?.userMedicineId));
      return () => {
        true;
      };
    }, []),
  );

  const downloadPdf = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    setModalVisible(true);
    const downloadResp = await Downloadpdf(item?.userMedicineId);
    setModalVisible(false);
    if (downloadResp !== 'err') {
      ToastAndroid.show('Downloaded successfully', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('Error while downloading', ToastAndroid.LONG);
    }
  };

  const showDetailfun = sDate => {
    detailData = historyData.find(el => el.date === sDate);
    if (detailData === undefined) {
      ToastAndroid.show('Not available', ToastAndroid.LONG);
      return;
    }
    showDetailState(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.mainCont}>
      <SubHeader
        title={'Medicine Report'}
        download={downloadPdf}
        navigation={navigation}
      />
      <CustomModal
        onRequestClose={() => setModalVisible(false)}
        type="fade"
        modalView={
          showDetail ? (
            <HistoryDetail
              data={detailData}
              onPress={() => {
                showDetailState(false);
                setModalVisible(false);
              }}
            />
          ) : (
            <LottieView
              style={styles.lottie}
              speed={0.8}
              source={require('../../../assets/animation/generatepdf.json')}
              autoPlay
              loop
            />
          )
        }
        modalVisible={modalVisible}
        customStyles={styles.detailView}
      />

      <View style={styles.progress}>
        <PerformanceCircle
          styles={styles}
          radius={52}
          borderWidth={9}
          percent={30}
          text={item?.medicineName}
        />
      </View>
      <View style={styles.bottomSheet}>
        <View style={styles.mainView}>
          <Text style={styles.heading}>
            Scheduled Dates for {item?.medicineName}
          </Text>
          <ScrollView
            keyExtractor={index => index.toString()}
            horizontal={true}
            contentContainerStyle={styles.scrollView}
            showsHorizontalScrollIndicator={false}>
            {allDates.map(mCurrentDate => {
              return (
                <View style={styles.scrollViewCont}>
                  <Text style={styles.scrollViewText}>{mCurrentDate.day}</Text>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      showDetailfun(
                        mCurrentDate.year +
                          '-' +
                          month[mCurrentDate.month] +
                          '-' +
                          mCurrentDate.date,
                      );
                    }}>
                    <View
                      style={{
                        marginHorizontal: 10,
                        padding: 12,
                        width: 70,
                        alignItems: 'center',
                        borderRadius: 35,
                        backgroundColor: mCurrentDate.color,
                      }}>
                      <View style={styles.scrollViewDate}>
                        <Text style={{color: 'black'}}>
                          {mCurrentDate.date}
                        </Text>
                      </View>
                      <Text style={{color: 'white', paddingVertical: 2}}>
                        {mCurrentDate.month}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Divider style={styles.divider1} />
        <Text style={styles.medicineHistory}>Medicine History</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={historyData}
          renderItem={({item, index}) => {
            return <Reminder item={item} index={index} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{padding: 8}}
        />
      </View>
    </View>
  );
};

export default MedicineReport;
