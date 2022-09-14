import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');
const {width} = Dimensions.get('screen');
const height_logo = height * 0.35;
const width_logo = width * 0.9;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    margin: 20,
  },
  image: {
    height: height_logo,
    width: width_logo,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    margin: 20,
    paddingLeft: 4,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default styles;
