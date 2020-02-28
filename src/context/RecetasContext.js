import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const RecetasContext = createContext();

const RecetasProvider = (props) => {
    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria: ''
    });

    const [consultar, guardarConsultar] = useState(false);

    useEffect(() => {
        if(consultar) {
            const obtenerRecetas = async () => {
                const { nombre, categoria } = busqueda;
                const url = `https://thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resultado = await axios.get(url);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda])

    return (
        <RecetasContext.Provider
            value={{
                recetas, buscarRecetas, guardarConsultar
            }}>
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;