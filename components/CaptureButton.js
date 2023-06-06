import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const CaptureButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});

export default CaptureButton;
