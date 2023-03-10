import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Button,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useContext, useState } from 'react';
import useCategorias from '../hooks/useCategorias';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';
import { Image } from 'react-native';

interface Props
    extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export default function ProductScreen({ navigation, route }: Props) {
    const { name = '', id = '' } = route.params;

    const [tempUri, setTempUri] = useState<string>();

    const { categories } = useCategorias();

    const {
        cargarProductsById,
        actualizarProducts,
        crearProducts,
        cargarImagen,
    } = useContext(ProductsContext);

    const { _id, categoriaId, nombre, img, form, onChange, setFormValue } =
        useForm({
            _id: id,
            categoriaId: '',
            nombre: name,
            img: '',
        });

    useEffect(() => {
        navigation.setOptions({
            title: nombre ? nombre : 'Buscar un Producto',
        });
    }, [nombre]);

    useEffect(() => {
        cargarProducto();
    }, []);

    const cargarProducto = async () => {
        if (id.length === 0) return; // no hagas nada
        const producto = await cargarProductsById(id);
        setFormValue({
            _id: id,
            categoriaId: producto.categoria._id,
            img: producto.img || '',
            nombre: producto.nombre,
        });
    };

    const saveOrUpdate = async () => {
        if (id.length > 0) {
            actualizarProducts(categoriaId, nombre, id);
        } else {
            const tempCategoriaId = categoriaId || categories[0]._id;
            const newProduct = await crearProducts(tempCategoriaId, nombre);
            onChange(newProduct._id, '_id');
        }
    };

    const tomarFotografia = () => {
        launchCamera(
            {
                mediaType: 'photo',
                quality: 0.5,
            },
            resp => {
                if (resp.didCancel) return;
                if (!resp.assets?.[0].uri) return;
                setTempUri(resp.assets?.[0].uri);
                cargarImagen(resp, _id);
            },
        );
    };

    // const abrirGaleria = () => {
    //     launchImageLibrary();
    // };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}> Nombre del Producto:</Text>
                <TextInput
                    placeholder="Producto ..."
                    style={styles.textInput}
                    value={nombre}
                    onChangeText={value => onChange(value, 'nombre')}
                />
                {/* PIKER O SELECTOR */}
                <Text style={styles.label}> Categorias:</Text>

                <Picker
                    selectedValue={categoriaId}
                    onValueChange={value => onChange(value, 'categoriaId')}>
                    {categories.map(c => (
                        <Picker.Item
                            label={c.nombre}
                            value={c._id}
                            key={c._id}
                        />
                    ))}
                </Picker>

                <Button
                    title="Guardar"
                    onPress={saveOrUpdate}
                    color="#5856D6"
                />

                {_id.length > 0 && (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                        <Button
                            title="Camara"
                            onPress={tomarFotografia}
                            color="#5856D6"
                        />

                        <View style={{ width: 20 }} />

                        <Button
                            title="Galeria"
                            // onPress={abrirGaleria}
                            color="#5856D6"
                        />
                    </View>
                )}

                {img.length > 0 && !tempUri && (
                    <Image
                        source={{ uri: img }}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            height: 300,
                        }}
                    />
                )}

                {/* TODO: Mostrar imagen temporal */}
                {tempUri && (
                    <Image
                        source={{ uri: tempUri }}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            height: 300,
                        }}
                    />
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    label: {
        fontSize: 18,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: '#afaeae5c',
        marginTop: 5,
        marginBottom: 15,
    },
});
