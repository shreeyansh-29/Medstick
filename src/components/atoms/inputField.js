import React from 'react';
import {TextInput} from 'react-native-paper';

const InputField = props => {
  const text = props?.text;
  return (
    <TextInput
      label={props.label}
      dense={props.dense}
      placeholder={props.placeholder}
      placeholderTextColor={'gray'}
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
      keyboardType={props.keyboardType}
      right={props.right}
      scrollEnabled={false}
    />
  );
};

export default InputField;
