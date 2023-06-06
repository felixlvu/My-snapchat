import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const WhiteScreen = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;

  const handleButtonPress = () => {
    navigation.navigate('Camera');
  };

  useEffect(() => {
    return () => {
      pan.x.removeAllListeners();
      pan.y.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleButtonPress}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Animated.View
        style={[styles.content, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
      >
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});

export default WhiteScreen;
