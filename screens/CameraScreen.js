import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, View, TouchableOpacity, Alert, Text } from 'react-native';
import { PanResponder } from 'react-native';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const longPressTimer = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current && hasPermission) {
      let photo = await cameraRef.current.takePictureAsync();
      navigation.navigate('Photo', { photo });
    }
  };

  const handleRecordVideo = () => {
    if (cameraRef.current && hasPermission) {
      if (!isRecording) {
        longPressTimer.current = setTimeout(async () => {
          const video = await cameraRef.current.recordAsync({ maxDuration: 5 });
          saveVideo(video);
          setIsRecording(false);
        }, 1000); // Temps en millisecondes avant de commencer l'enregistrement de la vidéo
      } else {
        clearTimeout(longPressTimer.current);
        cameraRef.current.stopRecording();
      }
      setIsRecording(!isRecording);
    }
  };

  const saveVideo = async (video) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(video.uri);
        const albumExists = await MediaLibrary.getAlbumAsync('my_snapchat');
        if (albumExists === null) {
          await MediaLibrary.createAlbumAsync('my_snapchat', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], albumExists.id, false);
        }
        Alert.alert('Vidéo enregistrée dans my_snapchat');
      }
    } catch (error) {
      console.log('Erreur lors de la sauvegarde de la vidéo :', error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState && gestureState.dx < -100) {
          navigation.navigate('StoryScreen');
        }
        if (gestureState && gestureState.dx > 100) {
          navigation.navigate('Message');
        }
      },
    })
  ).current;

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === false && <Text>No access to camera</Text>}
      {hasPermission === true && (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
          {...panResponder.panHandlers}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.captureButton, styles.captureButtonCombined]}
              onPress={handleTakePicture}
              onLongPress={handleRecordVideo}
              onPressOut={() => clearTimeout(longPressTimer.current)}
            />
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonCombined: {
    backgroundColor: 'white',
  },
  captureButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CameraScreen;
