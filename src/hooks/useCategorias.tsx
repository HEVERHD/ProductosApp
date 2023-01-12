import React from 'react';
import { useState, useEffect } from 'react';
import cafeApi from '../api/cafeApi';
import { CategoriasRespuesta, Categoria } from '../interfaces/appInterfaces';

export default function useCategorias() {
    const [estaCargando, setEstaCargando] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        const resp = await cafeApi.get<CategoriasRespuesta>('/categorias');
        setCategories(resp.data.categorias);
        setEstaCargando(false);
    };
    return {
        estaCargando,
        categories,
    };
}
