import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import HomeScreen from './screens/HomeScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import CameraScreen from './screens/CameraScreen';
import PhotoScreen from './screens/PhotoScreen';
import WhiteScreen from './screens/WhiteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="WhiteScreen" component={WhiteScreen} />
          <Stack.Screen name="Photo" component={PhotoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    paddingTop: getStatusBarHeight(),
  },
});
