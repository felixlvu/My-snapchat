import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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