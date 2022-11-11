import {TouchableOpacity} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const AddButton = ({routeName, navigation, styles, text}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(routeName, {
            sentBy: text,
          });
        }}>
        <LottieView
          style={styles}
          speed={0.6}
          source={require('../../assets/animation/addButton.json')}
          autoPlay
          loop
        />
      </TouchableOpacity>
    </>
  );
};

export default AddButton;
