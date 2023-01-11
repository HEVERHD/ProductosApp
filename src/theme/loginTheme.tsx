import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 25,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },
    title: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
    },

    label: {
        marginTop: 25,
        color: 'white',
    },

    inputField: {
        color: 'white',
        fontSize: 20,
    },

    inputFieldIOS: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
    },

    nuevoUsuarioContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    buttonTextCrearCuenta: {
        fontSize: 15,
        color: 'white',
    },

    buttonFab: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100,
    },
});