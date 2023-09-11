import React from 'react';

import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default async function App() {
  const [type, setType] = useState(CameraType.back);
  const [valueQR, setValueQR] = useState("");
  // const 
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraOpen, setCameraOpen] = useState(false);

  console.log(permission, requestPermission);
  // requestPermission()
  console.log(permission, requestPermission);
  // if:

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      {cameraOpen && 
         <Camera style={styles.camera} type={type} onBarCodeScanned={(e) => {
          setValueQR(e.data);
          setCameraOpen(false);
          return;
        }}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>}
        {!cameraOpen && 
          <View>
            <Button title="Ler Codigo QRcode" onPress={() => setCameraOpen(true)}/>  
            {valueQR.length > 0 && 
              <Text>O texto em seu QRcode é: {valueQR}</Text>}
          </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    // flex: 1,
    marginHorizontal: "auto",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    height: 500,
    width: "100%"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
