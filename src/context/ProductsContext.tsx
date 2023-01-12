import { createContext, useState, useEffect } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';

type ProductsContextProps = {
    products: Producto[];
    cargarProducts: () => Promise<void>;
    agregarProducts: (categoryId: string, productName: string) => Promise<void>;
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
    const agregarProducts = async (
        categoryId: string,
        productName: string,
    ) => {};
    const actualizarProducts = async (
        categoryId: string,
        productName: string,
        productId: string,
    ) => {};
    const borrarProducts = async (id: string) => {};
    const cargarProductsById = async (id: string) => {
        throw new Error('not implementd');
    };
    const cargarImagen = async (data: any, id: string) => {};

    return (
        <ProductsContext.Provider
            value={{
                products,
                cargarProducts,
                agregarProducts,
                actualizarProducts,
                borrarProducts,
                cargarProductsById,
                cargarImagen,
            }}>
            {children}
        </ProductsContext.Provider>
    );
};
