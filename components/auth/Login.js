import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import "firebase/auth";
import { app } from '../../database/firebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const auth = getAuth(app);
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <View>
      <TextInput placeholder="E-mail" onChange={e => setEmail(e.nativeEvent.text)} />
      <TextInput placeholder="Senha" secureTextEntry onChange={e => setPassword(e.nativeEvent.text)} />
      <Button title="submit" onPress={handleSubmit} />
    </View>
  )
};

export default Login;