import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const PhotoScreen = ({ route }) => {
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
            await MediaLibrary.addAssetsToAlbumAsync(
              [asset],
              albumExists.id,
              false
            );
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
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default PhotoScreen;