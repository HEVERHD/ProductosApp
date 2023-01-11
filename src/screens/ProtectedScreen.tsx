import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedScreen() {
    const { user, token, logOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ProtectedScreen</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                activeOpacity={0.9}
                onPress={logOut}>
                <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity>

            <Text>{JSON.stringify(user, null, 5)}</Text>
            <Text>{JSON.stringify(token, null, 5)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },

    buttonContainer: {
        justifyContent: 'center',
        backgroundColor: 'black',
        height: 40,
        width: 100,
        borderRadius: 100,
    },
    textButton: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
