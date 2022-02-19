import { View, Text, Button } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore';

export default function Firestore() {

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
            });
    }

    const getData = () => {
        firestore().collection('rmad_students').get().then((res) => {
            console.log(res.docs);
        });
    }

    return (
        <View>
            <Text>Firestore</Text>
            <Button
                title='Save Data'
                onPress={addData}
            />
            <Button
                title='Get Data'
                onPress={getData}
                color={"red"}
            />
        </View>
    )
}