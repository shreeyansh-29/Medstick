import {View, Text} from 'react-native';
import React from 'react';
import {Card, Divider} from 'react-native-paper';
import styles from '../../../styles/patientStyles/medicineReportStyles';
import ProgressReport from '../../../components/atoms/progressCircle';
import {colorPalette} from '../../../components/atoms/colorPalette';

const Reminder = ({item, index}) => {
  const nottaken = item.notTaken.split(',');
  const taken = item.taken.split(',');
  let tl, nt;
  nt = nottaken[0] === '' ? 0 : nottaken.length;
  tl = taken[0] === '' ? 0 : taken.length;

  const dateHandler = date => {
    let dob = date.split('-');
    return dob[2] + '-' + dob[1] + '-' + dob[0];
  };

  return (
    <Card key={'2'} style={styles.dateday}>
      <View key={'3'} style={styles.cardView}>
        <View style={styles.dateView}>
          <Text key={'7'} style={styles.date}>
            Date: {dateHandler(item.date)}
          </Text>
        </View>

        <View style={styles.progressView}>
          <ProgressReport
            percent={Math.round((tl / (tl + nt)) * 100)}
            radius={20}
            borderWidth={3}
            styles={{
              color: colorPalette.mainColor,
              shadowColor: colorPalette.restPercentageColor,
              bgColor: colorPalette.basicColor,
              percentage: {fontSize: 10, color: colorPalette.mainColor},
            }}
            text={Math.round((tl / (tl + nt)) * 100) + '%'}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      {nottaken.map(nti => {
        return (
          nti !== '' && (
            <View key={'4'} style={{flexDirection: 'row', marginBottom: 12}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  key={'5'}
                  style={{
                    color: 'grey',
                    paddingLeft: 18,
                  }}>
                  {nti}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text key={'6'} style={{color: 'red'}}>
                  Not Taken
                </Text>
              </View>
            </View>
          )
        );
      })}

      {taken.map(tti => {
        return (
          tti !== '' && (
            <View
              key={'12' + tti}
              style={{flexDirection: 'row', marginBottom: 12}}>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text
                  key={'5'}
                  style={{
                    color: 'grey',
                    paddingLeft: 18,
                  }}>
                  {tti}
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <Text key={'6'} style={styles.takenText}>
                  Taken
                </Text>
              </View>
            </View>
          )
        );
      })}
    </Card>
  );
};
export default Reminder;