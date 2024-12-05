import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarModel } from '@/types';

interface FavoriteCarsContextProps {
    favoriteCars: CarModel[];
    setFavoriteCars: React.Dispatch<React.SetStateAction<CarModel[]>>;
    refreshFavoriteCars: () => void;
}

export const FavoriteCarsContext = createContext<FavoriteCarsContextProps>({
    favoriteCars: [],
    setFavoriteCars: () => {},
    refreshFavoriteCars: () => {},
});

interface FavoriteCarsProviderProps {
    children: React.ReactNode;
}

export const FavoriteCarsProvider: React.FC<FavoriteCarsProviderProps> = ({ children }) => {
    const [favoriteCars, setFavoriteCars] = useState<CarModel[]>([]);

    const refreshFavoriteCars = async () => {
        try {
            const value = await AsyncStorage.getItem('FavoriteCars');
            const cars = value ? JSON.parse(value) : [];
            setFavoriteCars(cars);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        refreshFavoriteCars();
    }, []);

    return (
        <FavoriteCarsContext.Provider value={{ favoriteCars, setFavoriteCars, refreshFavoriteCars }}>
            {children}
        </FavoriteCarsContext.Provider>
    );
};