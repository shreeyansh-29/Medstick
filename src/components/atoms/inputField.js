import React from 'react';
import {TextInput} from 'react-native-paper';

const InputField = props => {
  const text = props?.text;
  return (
    <TextInput
      
      placeholder={props.placeholder}
      mode={props.mode}
      outlineColor={props.outlineColor}
      activeOutlineColor={props.activeOutlineColor}
      onChangeText={props.handleChange(text)}
      onBlur={props.handleBlur(text)}
      style={props.styles}
      value={props.value}
      maxLength={props.maxLength}
      multiline={props.multiline}
      selectTextOnFocus={props.selectTextOnFocus}
      autoComplete="off"
    />
  );
};

export default InputField;
