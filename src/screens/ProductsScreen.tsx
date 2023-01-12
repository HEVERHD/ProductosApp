import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';

export default function ProductsScreen() {
    const { products, cargarProducts } = useContext(ProductsContext);

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
                    <TouchableOpacity activeOpacity={0.8}>
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
