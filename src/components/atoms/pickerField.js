import React from 'react';
import {Picker} from '@react-native-picker/picker';

const PickerField = props => {
  const list = props?.pickerItem;
  const text = props?.text;
  return (
    <Picker
      mode={props.mode}
      selectedValue={props.selectedValue}
      onValueChange={itemchange => props.setFieldValue(text, itemchange)}>
      {list.map(item => (
        <Picker.Item
          key={item.label}
          label={item.label}
          value={item.value}
          style={{color: item.color}}
        />
      ))}
    </Picker>
  );
};

export default PickerField;
