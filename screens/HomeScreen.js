import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Inscription')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>INSCRIPTION</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.connexionContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
          style={styles.connexion}
        >
          <Text style={styles.connexionText}>CONNEXION</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/snap.png')}
        style={{ width: 150, height: 150, marginTop: 150 }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 0,
  },
  button: {
    backgroundColor: '#87CEFA',
    paddingVertical: 20,
    paddingHorizontal: 132,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    paddingHorizontal: '0%',
  },
  connexionContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 63,
  },
  connexion: {
    backgroundColor: 'red',
    paddingVertical: 20,
    paddingHorizontal: 132,
  },
  connexionText: {
    color: 'white',
    fontSize: 25,
    paddingHorizontal: '0%',
  },
});

export default HomeScreen;