import 'react-native-gesture-handler';

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AtuhProvider } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';

const AppState = ({ children }: any) => {
    return (
        <AtuhProvider>
            <ProductsProvider>{children}</ProductsProvider>
        </AtuhProvider>
    );
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
