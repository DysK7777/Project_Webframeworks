import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View, Text, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { CarModal } from "./CarModal";
import { CarFlatlist } from "./CarFlatlist";
import { CarSearch } from "./CarSearch";

export const FavoriteCars = () => {
    const [favoriteCars, setFavoriteCars] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCars, setFilteredCars] = useState<CarModel[]>([]);

    const refreshFavoriteCars = async () => {
        try {
            const value = await AsyncStorage.getItem('FavoriteCars');
            const cars = value ? JSON.parse(value) : [];
            setFavoriteCars(cars);
        } catch (e) {
            console.error(e);
        }
    };

    const toggleHeartStatus = async (car: CarModel) => {
        try {
            let updatedCars;
            if (car.Heart) {
                updatedCars = favoriteCars.filter((c) => c.id !== car.id);
            } else {
                updatedCars = favoriteCars.map((c) =>
                    c.id === car.id ? { ...c, Heart: !c.Heart } : c
                );
            }
            setFavoriteCars(updatedCars);
            setSelectedCar({ ...car, Heart: !car.Heart });
            await AsyncStorage.setItem('FavoriteCars', JSON.stringify(updatedCars));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        refreshFavoriteCars();
    }, []);

    return (
        <View style={styles.paddingTop}>
            {loading && <Text>Chill, give me a break!</Text>}
            <Text style={styles.carModels}>Lovely cars - {favoriteCars.length} cars</Text>
            <View>
                {/* Search bar for cars*/}
                <CarSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} carModels={favoriteCars} setFilteredCars={setFilteredCars} />
                {/* Show the car Flatlist */}
                <CarFlatlist refresh={refreshFavoriteCars} searchTerm={searchTerm} filteredCars={filteredCars} carModels={favoriteCars} refreshing={refreshing} setSelectedCar={setSelectedCar} />

                {selectedCar && (
                    <CarModal selectedCar={selectedCar} setSelectedCar={setSelectedCar} toggleHeartStatus={toggleHeartStatus} />
                )}
            </View>
        </View>
    )
}