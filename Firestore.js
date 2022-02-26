import { View, Text, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';

export default function Firestore() {

    const [name, setName] = useState('');

    useEffect(() => {
        const subscriber = firestore()
            .collection('rmad_students')
            .doc('KDkkjOWLQfjzQvh0F3Ir')
            .onSnapshot(documentSnapshot => {
                setName(documentSnapshot.data().name)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    const addData = () => {
        firestore()
            .collection('rmad_students')
            .add({
                address: "colombo",
                email: "nipun@gmail.com",
                name: "nipun duranga",
                phone_number: "0342258687"
            })
            .then(() => {
                console.log('User added!');
                Alert.alert("Data Saved !", 'Student saved successfully')
            }).catch((err) => {
                console.log(err);
            });
    }

    const getData = () => {
        firestore().collection('rmad_students').get().then((res) => {
            console.log(res.docs);
        });
    }

    const deleteData = () => {

    }

    const UpdateData = () => {

    }

    return (
        <View>
            <Text style={{ marginBottom: 25, fontSize: 20, marginLeft: 30 }}>React Native - Firebase Demo (Firestore)</Text>
            <Button
                title='Save Data'
                onPress={addData}
            />
            <Button
                title='Get Data'
                onPress={getData}
                color={"red"}
            />

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25, marginLeft: 25 }}>Real time name : {name}</Text>
        </View>
    )
}