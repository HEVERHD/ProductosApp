import { Usuario } from '../interfaces/appInterfaces';

// como va a lucir el estado
export interface AuthState {
    status: 'chequeando' | 'autenticado' | 'no-autenticado';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
}
type AuthAction =
    | { type: 'sigUp'; payload: { token: string; user: Usuario } }
    | { type: 'addError'; payload: string }
    | { type: 'removeError' }
    | { type: 'noAutenticado' }
    | { type: 'logout' };

//REDUCER (es una funcion pura que debe revolser acciones)
export const authReducer = (
    state: AuthState,
    action: AuthAction,
): AuthState => {
    switch (action.type) {
        // las acciones a modificar
        case 'addError':
            return {
                ...state,
                user: null,
                token: null,
                status: 'no-autenticado',
                errorMessage: action.payload,
            };
        // quitar el mensaje de error
        case 'removeError':
            return {
                ...state,
                errorMessage: '',
            };
        // colocar el estado autenticado cuando tenga toda la informacion del usuario
        case 'sigUp':
            return {
                ...state,
                errorMessage: '',
                status: 'autenticado',
                token: action.payload.token, // el payload es donde vienen los datos
                user: action.payload.user, // el payload es donde vienen los datos
            };
        // coloca el estado como no autenticado
        case 'logout':
        case 'noAutenticado':
            return {
                ...state,
                status: 'no-autenticado',
                token: null,
                user: null,
            };

        default:
            return state;
    }
};
