import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import LogoBlanco from '../components/LogoBlanco';
import { StackScreenProps } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export default function RegisterScreen({ navigation }: Props) {
    const { signUp, removeError, errorMessage } = useContext(AuthContext);

    const { email, password, onChange, nombre } = useForm({
        nombre: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (removeError.length === 0) return;
        Alert.alert('Registro Incorrecto', errorMessage, [
            {
                text: 'Ok',
                onPress: removeError,
            },
        ]);
    }, [errorMessage]);

    const onRegister = () => {
        console.log({ email, password, nombre });
        Keyboard.dismiss();
        signUp({
            nombre,
            correo: email,
            password,
        });
    };

    return (
        <>
            {/* FONDO */}

            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={loginStyles.formContainer}>
                    <LogoBlanco />
                    <Text style={loginStyles.title}>Register</Text>
                    <Text style={loginStyles.label}>Name:</Text>
                    <TextInput
                        style={[
                            loginStyles.inputField,
                            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                        ]}
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        placeholder="Ingrese su nombre..."
                        underlineColorAndroid="white"
                        // Onchage, value
                        onChangeText={value => onChange(value, 'nombre')}
                        value={nombre}
                        onSubmitEditing={onRegister}
                        autoCapitalize="words"
                        autoCorrect={false}
                    />
                    <Text style={loginStyles.label}>Email:</Text>
                    <TextInput
                        style={[
                            loginStyles.inputField,
                            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                        ]}
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        placeholder="Ingrese su email.."
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        // Onchage, value
                        onChangeText={value => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onRegister}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <Text style={loginStyles.label}>Password:</Text>
                    <TextInput
                        style={[
                            loginStyles.inputField,
                            Platform.OS === 'ios' && loginStyles.inputFieldIOS,
                        ]}
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        placeholder="******"
                        underlineColorAndroid="white"
                        secureTextEntry
                        // Onchage, value
                        onChangeText={value => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    {/* BOTON LOGIN */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            style={loginStyles.button}
                            activeOpacity={0.8}
                            onPress={onRegister}>
                            <Text style={loginStyles.buttonText}>
                                Crear cuenta
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.replace('LoginScreen')}
                        style={loginStyles.buttonFab}>
                        <Text style={loginStyles.buttonText}>Login </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}
