import React, { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { View, Image, Text, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState();
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    (async () => {
      const cameraRequest = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraRequest.status === 'granted');
      const galleryRequest = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryRequest.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === null) {
    return <Text>No access to camera</Text>;
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {image ? (
          <Image source={{ uri: image }} style={{ flex: 1 }} />
        ) : (
          <Camera
            ref={(ref) => setCamera(ref)}
            style={{ flex: 1, aspectRatio: 1 }}
            type={type}
            ratio={'1:1'}
          />
        )}
      </View>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Button
          title='Flip Camera'
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
        <Button title='Take Picture' onPress={() => takePicture()} />
        <Button title='Select from the Gallery' onPress={() => pickImage()} />
        <Button title=' Save' onPress={() => navigation.navigate('Save', { image })}/>
      </View>
    </View>
  );
}