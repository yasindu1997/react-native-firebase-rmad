import { View, Text, Button } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';

export default function App() {

  const register = async () => {
    await auth()
      .createUserWithEmailAndPassword('yasindusathsara@gmail.com', 'SuperSecretPassword!')
      .then(async () => {
        await auth().currentUser.updateProfile({
          displayName: 'yasindu1997',
          phoneNumber: '+94775067538',
          photoURL:'http://example.com/'
        })
        console.log('User account created & signed in!');
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

  return (
    <View>
      <Text>App</Text>
      <Button
        title='Register'
        color={'red'}
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