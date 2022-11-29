import {colorPalette} from '../../../components/atoms/colorPalette';
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

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
  percentage,
  setModalVisible,
  history,
}) {

  // console.log('Percent in day comp. =>', percentage);
  return (
    <TouchableOpacity
      disabled={state === 'disabled'}
      style={{}}
      activeOpacity={1}
      onPress={() => {
        setSelectedDate(date.dateString);
        setModalVisible();
        history(date);
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
    </TouchableOpacity>
  );
}

export default DayComponent;
