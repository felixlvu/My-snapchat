import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, View, TouchableOpacity, PanResponder, Alert, Text } from 'react-native';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showWhiteScreen, setShowWhiteScreen] = useState(false);

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

  const handleRecordVideo = async () => {
    if (cameraRef.current && hasPermission) {
      if (isRecording) {
        cameraRef.current.stopRecording();
      } else {
        const video = await cameraRef.current.recordAsync({ maxDuration: 5 });
        saveVideo(video);
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
        Alert.alert('Video enregistrée dans my_snapchat');
      }
    } catch (error) {
      console.log('Erreur lors de la sauvegarde de la vidéo :', error);
    }
  };

  const handleGesture = (gestureState) => {
    if (gestureState && gestureState.dx < -100) {
      setShowWhiteScreen(true);
      navigation.navigate('WhiteScreen');
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState && gestureState.dx < -100) {
          handleGesture(gestureState);
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
              style={[styles.captureButton, styles.captureButtonCapture]}
              onPress={handleTakePicture}
            />
            <TouchableOpacity
              style={[styles.captureButton, styles.captureButtonRecord]}
              onPress={handleRecordVideo}
            />
          </View>
        </Camera>
      )}
      {showWhiteScreen && <View style={styles.whiteScreen} />}
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
  captureButtonCapture: {
    backgroundColor: 'white',
  },
  captureButtonRecord: {
    backgroundColor: 'white',
  },
  whiteScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  captureButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CameraScreen;
