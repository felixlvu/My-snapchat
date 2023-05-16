import { StatusBar, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
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
        source={require('./assets/snap.png')}
        style={{ width: 150, height: 150 , marginTop: 150,}}
      />

      <StatusBar style="auto" />
    </View>
  );
}

function InscriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Page d'inscription</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleConnexionPress = async () => {
    if (cameraRef && hasPermission) {
      let photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
    }
  };
  const handleTakePicture = async () => {
    if (cameraRef && hasPermission) {
      let photo = await cameraRef.takePictureAsync();
      navigation.navigate('Photo', { photo });
    }
  };

  
  return (
    <View style={{ flex: 1 }}>
      {hasPermission === false && <Text>No access to camera</Text>}
      {hasPermission === true && (
        <Camera
          ref={(ref) => {
            setCameraRef(ref);
          }}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={handleConnexionPress}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  color: 'white',
                }}
              >
                CONNEXION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleTakePicture}
            >
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}
    </View>
  );
}

function PhotoScreen({ route }) {
  const { photo } = route.params;

  const handleSavePhoto = async () => {
    if (photo) {
      try {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
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
        Alert.alert('Erreur lors de l\'enregistrement de la photo');
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />
      <TouchableOpacity onPress={handleSavePhoto}>
        <Text>Enregistrer la photo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Inscription" component={InscriptionScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  text: {
    fontSize: 20,
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
    paddingVertical: 15,
    paddingHorizontal: 135,
  },
  connexionText: {
    color: 'white',
    fontSize: 25,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  captureButton: {
    bottom: 20,
    marginHorizontal: "40%",
    marginVertical: "160%",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowRadius: 5
},
});
