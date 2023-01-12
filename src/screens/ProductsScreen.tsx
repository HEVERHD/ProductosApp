import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props
    extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

export default function ProductsScreen({ navigation }: Props) {
    const { products, cargarProducts } = useContext(ProductsContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10,
                    }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ProductScreen', {})}>
                    <Text>Agregar </Text>
                </TouchableOpacity>
            ),
        });
    }, []);

    //PULL TO REFRESH

    return (
        <View
            style={{
                flex: 1,
                marginHorizontal: 10,
            }}>
            <FlatList
                data={products}
                keyExtractor={p => p._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('ProductScreen', {
                                id: item._id,
                                name: item.nombre,
                            })
                        }
                        activeOpacity={0.8}>
                        <Text style={styles.productName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separador} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    productName: {
        fontSize: 20,
    },

    separador: {
        borderBottomWidth: 2,
        borderBottomColor: '#5c5c5c78',
        marginVertical: 5,
    },
});
