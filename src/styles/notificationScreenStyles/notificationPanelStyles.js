import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';

export const notificationStyles = StyleSheet.create({
  card: {
    width: '98%',
    borderColor: colorPalette.appColor,
    backgroundColor: colorPalette.basicColor,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  screen: {
    backgroundColor: colorPalette.backgroundColor,
    flex: 1,
  },
  headerText: {
    fontSize: 16,
    color: colorPalette.darkGrey,
    fontWeight: '600',
  },
  container: {
    alignItems: 'center',
    paddingTop: 5,
  },
  messageText: {
    fontSize: 20,
    fontWeight: '500',
    color: colorPalette.appColor,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: colorPalette.blackColor,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMessage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
