import { createContext, useReducer } from 'react';
import { Usuario, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from './AuthReducer';
import cafeApi from '../api/cafeApi';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'chequeando' | 'autenticado' | 'no-autenticado'; // estados personalizados
    signIn: (loginData: LoginData) => void;
    signUp: () => void;
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
        } catch (error: any) {
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Informacion incorrecta',
            });
        }
    };
    const signUp = () => {};
    const logOut = () => {};

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
