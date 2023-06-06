import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

const PhotoScreen = ({ route, navigation }) => {
  const { photo } = route.params;

  const handleSavePhoto = async () => {
    if (photo) {
      try {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const asset = await MediaLibrary.createAssetAsync(photo.uri);
          const albumExists = await MediaLibrary.getAlbumAsync('my_snapchat');
          if (albumExists === null) {
            await MediaLibrary.createAlbumAsync('my_snapchat', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], albumExists.id, false);
          }
          Alert.alert('Photo enregistrée dans my_snapchat');
        } else {
          Alert.alert('Permission refusée pour accéder à la galerie');
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Erreur lors de l'enregistrement de la photo");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.image} />
      <TouchableOpacity onPress={handleSavePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Enregistrer la photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Camera')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
});

export default PhotoScreen;
