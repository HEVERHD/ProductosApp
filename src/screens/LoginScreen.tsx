import {
    View,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import LogoBlanco from '../components/LogoBlanco';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export default function LoginScreen({ navigation }: Props) {
    const { email, password, onChange } = useForm({
        email: '',
        password: '',
    });

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();
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
