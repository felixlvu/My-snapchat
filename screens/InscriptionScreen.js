import React from 'react';
import firebase from 'firebase/app';
import { StyleSheet, Text, View } from 'react-native';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDISP6YR0HDz433kYvqOyGJ0YT13cjPWzI',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'my-snapchat-ac679',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

firebase.initializeApp(firebaseConfig);

const InscriptionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page d'inscription</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default InscriptionScreen;