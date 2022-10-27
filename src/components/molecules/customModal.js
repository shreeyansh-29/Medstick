import {View, Modal, StyleSheet,} from 'react-native';
import React from 'react';

const CustomModal = ({modalVisible, modalView, customStyles, type}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType={type} transparent={true} visible={modalVisible}>
        {type === 'slide' && (
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={customStyles}>{modalView}</View>
          </View>
        )}
        {type === 'fade' && (
          <>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={customStyles}>{modalView}</View>
            </View>
          </>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default CustomModal;
