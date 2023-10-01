import * as React from 'react';
import {Text, View, Button, TouchableOpacity, StyleSheet} from 'react-native';

const Landing = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{ marginBottom: '1rem'}}>Welcome to Imagigram</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Register')}>
      <Text style={styles.text}>Register</Text>
    </TouchableOpacity>
    
    <Button
      icon='login-variant'
      title="Login"
      onPress={() => navigation.navigate('Login')}
    />

  </View>
);

export default Landing;

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontWeight: 600,
    textTransform: 'uppercase'

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: '1rem'
  },
});