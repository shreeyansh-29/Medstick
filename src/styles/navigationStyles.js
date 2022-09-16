import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  addbtn: {marginBottom: 57},
  btn: {height: 84, width: 84},
  ripple: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  focused: {fontSize: 11, marginTop: 4, color: 'black', fontWeight: '500'},
  notFocused: {fontSize: 11, marginTop: 4, color: 'grey', fontWeight: '300'},
});
