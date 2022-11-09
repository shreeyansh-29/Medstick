import React from 'react';
import {Button} from 'react-native-elements';

const CustomButton = props => {
  return (
    <Button
      title={props.title}
      buttonStyle={props.btnStyles}
      containerStyle={props.contStyles}
      onPress={props.handleSubmit}
    />
  );
};

export default CustomButton;
