import { createContext, useReducer, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Usuario,
    LoginResponse,
    LoginData,
    RegisterData,
} from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'chequeando' | 'autenticado' | 'no-autenticado'; // estados personalizados
    signIn: (loginData: LoginData) => void;
    signUp: (register: RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
};

//estado inicial
const AuthInicialState: AuthState = {
    status: 'chequeando',
    token: null,
    user: null,
    errorMessage: '',
};

// asi va a lucir la informacion que voy a exponer
export const AuthContext = createContext({} as AuthContextProps);

export const AtuhProvider = ({ children }: any) => {
    //hooks useReducer para conectar el Authreducer con nuestro AuthContext
    const [state, dispatch] = useReducer(authReducer, AuthInicialState);

    //EFECTO PARA OBTENER EL TOKEN DE MANERA FISICA
    useEffect(() => {
        validaToken();
    }, []);

    const validaToken = async () => {
        const token = await AsyncStorage.getItem('token');
        //no token no autenticado
        if (!token) return dispatch({ type: 'noAutenticado' });

        // Tengo un TOKEN
        const resp = await cafeApi.get('/auth');
        if (resp.status !== 200) {
            return dispatch({ type: 'noAutenticado' });
        }
        dispatch({
            type: 'sigUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            },
        });
    };

    //LOGIN
    const signIn = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', {
                correo,
                password,
            });
            dispatch({
                type: 'sigUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });
            //EFECTO PARA GUARDAR EL TOKEN DE MANERA FISICA
            await AsyncStorage.setItem('token', data.token);
        } catch (error: any) {
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Informacion incorrecta',
            });
        }
    };
    // funcion REGISTRO
    const signUp = async ({ nombre, correo, password }: RegisterData) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', {
                correo,
                password,
                nombre,
            });
            dispatch({
                type: 'sigUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                },
            });
            //EFECTO PARA GUARDAR EL TOKEN DE MANERA FISICA
            await AsyncStorage.setItem('token', data.token);
        } catch (error: any) {
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data || 'Revise la informacion',
            });
        }
    };

    // Logout function
    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    // remover
    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider
            value={{
                // valor de retorno
                ...state,
                signIn,
                signUp,
                logOut,
                removeError,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
