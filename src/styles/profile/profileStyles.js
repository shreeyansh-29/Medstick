import {StyleSheet} from 'react-native';
import {colorPalette} from '../../components/atoms/colorPalette';
import {deviceHeight} from '../../components/atoms/constant';

const styles = StyleSheet.create({
  //saved Details
  card: {
    borderRadius: 10,
    marginBottom: 12,
    width: '92%',
    alignSelf: 'center',
    elevation: 3,
  },
  mainView: {
    margin: 6,
    minHeight: 80,
    width: '96.5%',
    // backgroundColor: 'lightblue',
    // borderRadius: 18,
  },
  subView1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingTop: 2,
  },
  heading: {
    fontSize: 19,
    // marginLeft: 4,
    fontWeight: '500',
    color: 'black',
  },
  subCont: {marginBottom: 8},
  subView2: {
    marginHorizontal: 9,
    marginTop: 4,
    // backgroundColor: 'red',
    fontSize: 17,
  },
  content: {color: 'grey'},
  modalView: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
  },

  //editProfile
  parentContainer: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
  },
  childCont: {
    height: 180,
    backgroundColor: colorPalette.mainColor,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 83,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 20,
    marginLeft: 20,
  },
  infoCont: {
    marginBottom: 20,
    marginLeft: 16,
    width: '48%',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  email: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 6,
  },
  editBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {color: 'white', marginRight: 6, fontSize: 16},

  //inputField
  field: {height: 50, backgroundColor: 'white'},
  bio: {height: 120, backgroundColor: 'white'},
  inputForm: {
    marginHorizontal: 20,
    // backgroundColor: 'red',
  },
  inputField: {
    marginBottom: 10,
  },
  editButtonContainer: {alignItems: 'center', marginVertical: 20},
  editButton: {
    backgroundColor: colorPalette.mainColor,
    width: '50%',
    borderRadius: 5,
  },
  errorText: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 14,
    marginTop: 1,
  },
  errorText1: {
    fontSize: 15,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 14,
    marginTop: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  subInputGroup: {width: '48%'},
  picker: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 4,
  },
});

export default styles;
