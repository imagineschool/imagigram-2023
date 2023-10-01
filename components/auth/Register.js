import React, { useState } from 'react';
import {View, TextInput, Button} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";

import { app, db }  from '../../database/firebaseConfig';

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    const auth = getAuth(app);
    try {
      const dataUser = await createUserWithEmailAndPassword(auth, email, password)
      if (dataUser) {
        try {
          const usersRef = collection(db, "users")
          await setDoc(doc(usersRef, auth.currentUser.uid), {
            name,
            email,
          })
        } catch (err) {
          console.log('errDoc: ', err);
        }
      }
    } catch (err) {
      console.log('errUser: ', err)
    }
  };
  
  return (
    <View>
      <TextInput placeholder='Nome' onChangeText={setName} />
      <TextInput placeholder='E-mail' onChangeText={setEmail} />
      <TextInput
        placeholder='Password'
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  )
};

export default Register;