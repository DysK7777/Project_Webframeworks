import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Modal, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Feather from '@expo/vector-icons/Feather';
import { CarModal } from "./CarModal";
import { CarFlatlist } from "./CarFlatlist";
import { CarSearch } from "./CarSearch";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4
export const ShowCars = () => {
    // const { favoriteCars, setFavoriteCars, refreshFavoriteCars } = useContext(FavoriteCarsContext);

    const [carModels, setCarModels] = useState<CarModel[]>([]);
    const [filteredCars, setFilteredCars] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const refreshFavoriteCars = async () => {
        try {
            const value = await AsyncStorage.getItem('FavoriteCars');
            const cars = value ? JSON.parse(value) : [];
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        setLoading(true);
        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4' };
        const baseURL = "https://sampleapis.assimilate.be/car/models";
        const fetchCarModels = async () => {
            try {
                const response = await fetch(`${baseURL}?name.first=Bender`, { headers });
                const data: CarModel[] = await response.json();
                const favoriteCars = await AsyncStorage.getItem("FavoriteCars");
                const favoriteCarsArray: CarModel[] = favoriteCars ? JSON.parse(favoriteCars) : [];

                data.forEach(car => {
                    car.Heart = favoriteCarsArray.some(favCar => favCar.id === car.id);
                });

                setCarModels(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchCarModels();
    }, [refreshing]);

    const refresh = async () => {
        setRefreshing(true);
        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4' };
        const baseURL = "https://sampleapis.assimilate.be/car/models";
        try {
            const response = await fetch(`${baseURL}?name.first=Bender`, { headers });
            const data: CarModel[] = await response.json();
            const favoriteCars = await AsyncStorage.getItem("FavoriteCars");
            const favoriteCarsArray: CarModel[] = favoriteCars ? JSON.parse(favoriteCars) : [];

            data.forEach(car => {
                car.Heart = favoriteCarsArray.some(favCar => favCar.id === car.id);
            });

            setCarModels(data);
        } catch (e) {
            console.error(e);
        } finally {
            setRefreshing(false);
        }
    }

    const pressLiked = async (selectedCar: CarModel) => {
        selectedCar.Heart = !selectedCar.Heart;
        setCarModels(
            carModels.map((car) =>
                car.id === selectedCar.id
                    ? { ...car, Heart: selectedCar.Heart }
                    : { ...car, Heart: car.Heart }
            )
        );

        try {
            const favoriteCars = await AsyncStorage.getItem("FavoriteCars");
            let favoriteCarsArray: CarModel[] = favoriteCars ? JSON.parse(favoriteCars) : [];

            if (selectedCar.Heart) {
                if (!favoriteCarsArray.some((car) => car.id === selectedCar.id)) {
                    favoriteCarsArray.push(selectedCar);
                }
            } else {
                favoriteCarsArray = favoriteCarsArray.filter((car: CarModel) => car.id !== selectedCar.id);
            }

            await AsyncStorage.setItem("FavoriteCars", JSON.stringify(favoriteCarsArray));
            refreshFavoriteCars();
            setRefreshing(true);
        } catch (e) {
            console.error(e);
        }
    }
    const deleteCar = async (carId: number) => {
        try {
            const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4' };
            const response = await fetch(`https://sampleapis.assimilate.be/car/models/${carId}`, {
                method: 'DELETE',
                headers
            });
            if (response.ok) {
                const deletedCar = carModels.find(car => car.id === carId);
                setCarModels(carModels.filter(car => car.id !== carId));
                if (deletedCar) {
                    Alert.alert('Car Deleted', `${deletedCar.name} (${deletedCar.year}) has been deleted.`);
                }
            } else {
                console.error('Failed to delete the car');
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <View style={styles.paddingTop}>
            {loading && <Text>Chill, give me a break!</Text>}
            <Text style={styles.carModels}>Car Models - {carModels.length} cars</Text>
            <View>
                <CarSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} carModels={carModels} setFilteredCars={setFilteredCars} />
                        <CarFlatlist refresh={refresh} searchTerm={searchTerm} filteredCars={filteredCars} carModels={carModels} refreshing={refreshing} setSelectedCar={setSelectedCar} deleteCar={deleteCar} />
                {/* Show the pop up for the car*/}
                {selectedCar && (
                    <CarModal selectedCar={selectedCar} setSelectedCar={setSelectedCar} toggleHeartStatus={pressLiked} />
                )}
            </View>
        </View>
    )
}