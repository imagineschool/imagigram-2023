import React, { useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';

import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

import 'firebase/firestore'
import 'firebase/storage';
import 'firebase/auth';

import { app, db } from '../../database/firebaseConfig';

const auth = getAuth(app);
const storage = getStorage(app);

const Save = ({ navigation, route }) => {
  const { image } = route.params;
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
    const res = await fetch(image);
    const blob = await res.blob();
    const storageRef = ref(storage, childPath);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log('storage/unauthorized: ', error.message)
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log('storage/canceled: ', error.message)
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            console.log('storage/unknown: ', error.message)
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          savePostData(downloadURL)
        });
      }
    );

  };

  const savePostData = async (downloadURL) => {
    const postsRef = collection(db, "posts")

    await addDoc(collection(postsRef, auth.currentUser.uid, 'userPosts'), {
      downloadURL,
      caption,
      creation: serverTimestamp()
    })

    navigation.popToTop()
  }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: image }} />
      <TextInput
        placeholder='Enter a description...'
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title='Save' onPress={() => uploadImage()} />
    </View>
  );
}


export default Save;