import { createContext, useState, useEffect } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';
import { ImagePickerResponse } from 'react-native-image-picker';

type ProductsContextProps = {
    products: Producto[];
    cargarProducts: () => Promise<void>;
    crearProducts: (categoryId: string, productName: string) => Promise<void>;
    actualizarProducts: (
        categoryId: string,
        productName: string,
        productId: string,
    ) => Promise<void>;
    borrarProducts: (id: string) => Promise<void>;
    cargarProductsById: (id: string) => Promise<Producto>;
    cargarImagen: (data: any, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {
    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        cargarProducts();
    }, []);

    const cargarProducts = async () => {
        const resp = await cafeApi.get<ProductsResponse>(
            '/productos?limite=100',
        );
        // setProducts([...products, ...resp.data.productos]);
        setProducts([...resp.data.productos]);
    };
    const crearProducts = async (
        categoryId: string,
        productName: string,
    ): Promise<Producto> => {
        const resp = await cafeApi.post<Producto>('/productos', {
            // mandar la data al backend
            nombre: productName,
            categoria: categoryId,
        });
        setProducts([...products, resp.data]);

        return resp.data;
    };
    const actualizarProducts = async (
        categoryId: string,
        productName: string,
        productId: string,
    ) => {
        const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
            // mandar la data al backend
            nombre: productName,
            categoria: categoryId,
        });
        setProducts(
            products.map(prod => {
                return prod._id === productId ? resp.data : prod;
            }),
        );
    };
    const borrarProducts = async (id: string) => {};

    const cargarProductsById = async (id: string): Promise<Producto> => {
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    };
    const cargarImagen = async (
        data: ImagePickerResponse,
        productId: string,
    ) => {
        const archivoAsubir = {
            uri: data.assets[0].uri,
            type: data.assets[0].type,
            name: data.assets[0].fileName,
        };

        const formatoDatos = new FormData();
        formatoDatos.append('archivo', archivoAsubir);

        try {
            const resp = await cafeApi.put(
                `/uploads/productos/${productId}`,
                formatoDatos,
            );
            console.log(resp);
            console.log({ resp });
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                cargarProducts,
                crearProducts,
                actualizarProducts,
                borrarProducts,
                cargarProductsById,
                cargarImagen,
            }}>
            {children}
        </ProductsContext.Provider>
    );
};
