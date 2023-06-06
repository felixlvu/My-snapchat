import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
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
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
  },
});

export default WhiteScreen;
