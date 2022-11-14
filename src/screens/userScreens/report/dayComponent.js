import {colorPalette} from '../../../components/atoms/colorPalette';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import HistoryDetail from '../patients/historyDetail';
import {Modal} from 'react-native-paper';
import AnimatedCircles from '../../../components/atoms/AnimatedCircle';

function ColorCode(percentage) {
  if (percentage < 60) {
    return colorPalette.redPercentageColor;
  } else if (61 <= percentage && percentage < 90) {
    return 'orange';
  } else {
    return colorPalette.greenPercentageColor;
  }
}

function DayComponent({
  state,
  date,
  setSelectedDate,
  initialDate,
  selectedDate,
  percentage,
  setModalVisible,
}) {
  return (
    <TouchableOpacity
      disabled={state === 'disabled'}
      style={{}}
      activeOpacity={1}
      onPress={() => {
        setSelectedDate(date.dateString);
        setModalVisible(date.dateString);
      }}>
      <ProgressCircle
        percent={percentage}
        radius={15}
        borderWidth={3}
        color={ColorCode(percentage)}
        shadowColor={'lightgrey'}
        bgColor={colorPalette.backgroundColor}>
        <Text style={{fontSize: 16, color: colorPalette.blackColor}}>
          {date.day}
        </Text>
      </ProgressCircle>
        {/* <AnimatedCircles
        radius={15}
        percentage={percentage}
        strokeWidth={2}
        text={date.day}
        color={ColorCode(percentage)}
      /> */}
    </TouchableOpacity>
  );
}

export default DayComponent;
