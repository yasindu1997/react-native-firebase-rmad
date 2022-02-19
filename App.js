import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '44150495231-fqi0niphjibstsljbf964hn4obi012bd.apps.googleusercontent.com',
});

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

  const googleSignIn = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential).then((res) => {
      console.log(res);
    });
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

      <GoogleSigninButton
        style={{ width: 192, height: 55 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10
  }
})