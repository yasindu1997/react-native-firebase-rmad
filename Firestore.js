import { View, Text, Button } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';

export default function Firestore() {

    const addData = () => {
        firestore()
            .collection('Users')
            .add({
                address: "colombo",
                email: "nipun@gmail.com",
                name: "nipun duranga",
                phone_number: "0342258687"
            })
            .then(() => {
                console.log('User added!');
            });
    }

    return (
        <View>
            <Text>Firestore</Text>
            <Button
                title='Save Data'
                onPress={addData}
            />
        </View>
    )
}