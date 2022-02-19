import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';

export default function App() {

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await auth().currentUser.updateProfile({
          displayName: userName,
          phoneNumber: phone,
        })
        console.log('User account created & signed in!');
        clear();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  const login = () => {
    auth().signInWithEmailAndPassword('yasindusathsara@gmail.com', 'SuperSecretPassword!')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("Credentials Incorrect !");
      })
  }

  const clear = () => {
    setEmail('');
    setUserName('');
    setPhone('');
    setPassword('');

  }

  return (
    <View>
      <Text style={{ marginBottom: 25, fontSize: 20, marginLeft: 30 }}>React Native - Firebase Demo</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        label="User Name"
        value={userName}
        style={styles.textInput}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        label="Phone No"
        value={phone}
        style={styles.textInput}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry={true}
        style={{ marginBottom: 20, marginTop: 10 }}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title='Register'
        color={'red'}
        style={styles.textInput}
        onPress={register}
      />
      <Button
        title='Login'
        color={'green'}
        onPress={login}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10
  }
})