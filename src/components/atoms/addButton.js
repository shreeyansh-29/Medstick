import {TouchableOpacity} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const AddButton = ({routeName, navigation, styles, stackName, params}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate(stackName, {
            params: params,
            screen: routeName,
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
