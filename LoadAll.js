import { View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore';

export default function LoadAll() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('rmad_students')
            .onSnapshot(querySnapshot => {
                const students = [];

                console.log(querySnapshot.docs);

                querySnapshot.forEach(documentSnapshot => {
                    students.push({
                        ...documentSnapshot.data(),
                    });
                });

                setStudents(students);
            });

        return () => subscriber();
    }, []);

    return (
        <View>
            <FlatList
                data={students}
                renderItem={({ item }) => (
                    <View style={{ height: 100, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Name: {item.name}</Text>
                        <Text>Address: {item.address}</Text>
                        <Text>Email: {item.email}</Text>
                        <Text>Phone: {item.phone_number}</Text>
                        <Text>----------------------------------------------------------------</Text>
                    </View>
                )}
            />
        </View>
    )
}