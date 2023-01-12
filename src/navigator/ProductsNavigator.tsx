import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

export type ProductsStackParams = {
    ProductsScreen: undefined;
    ProductScreen: { id?: string; name?: string };
};

const Stack = createStackNavigator<ProductsStackParams>();

export default function ProductsNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white',
                },
                headerStyle: {
                    elevation: 0,
                },
            }}>
            <Stack.Screen
                name="ProductsScreen"
                component={ProductsScreen}
                options={{ title: 'Productos' }}
            />

            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    );
}
