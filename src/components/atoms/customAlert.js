import {Alert} from 'react-native';

export const CustomAlert = ({
  text1,
  text2,
  action1,
  action2,
  onPress1,
  onPress2,
}) => {
  Alert.alert(text1, text2, [
    {
      text: action1,
      onPress: onPress1,
    },
    {
      text: action2,
      onPress: onPress2,
    },
  ]);
};
