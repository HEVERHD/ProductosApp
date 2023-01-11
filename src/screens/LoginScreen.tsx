import {
    View,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import Background from '../components/Background';
import LogoBlanco from '../components/LogoBlanco';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export default function LoginScreen({ navigation }: Props) {
    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (useEffect.length === 0) return;
        Alert.alert('Login Incorrecto', errorMessage, [
            {
                text: 'Ok',
                onPress: removeError,
            },
        ]);
    }, [errorMessage]);

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();

        signIn({ correo: email, password });
    };
    return (
        <>
            {/* FONDO */}
            <Background />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={loginStyles.formContainer}>
                    <LogoBlanco />
                    <Text style={loginStyles.title}>Log In</Text>
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
                        onSubmitEditing={onLogin}
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
                        onSubmitEditing={onLogin}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    {/* BOTON CREAR CUENTA */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            style={loginStyles.button}
                            activeOpacity={0.8}
                            onPress={onLogin}>
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta */}
                    <View style={loginStyles.nuevoUsuarioContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.replace('RegisterScreen')
                            }>
                            <Text style={loginStyles.buttonTextCrearCuenta}>
                                Crear una cuenta{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}
