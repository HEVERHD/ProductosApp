import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AtuhProvider } from './src/context/AuthContext';

const AppState = ({ children }: any) => {
    return <AtuhProvider>{children}</AtuhProvider>;
};

export default function App() {
    return (
        <NavigationContainer>
            <AppState>
                <Navigator />
            </AppState>
        </NavigationContainer>
    );
}
