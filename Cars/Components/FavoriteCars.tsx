import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View, Text, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

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
            <Text style={styles.carModels}>Lovely cars</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Audi.."
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        const filtered = favoriteCars.filter((car) =>
                            car.name.toLowerCase().includes(text.toLowerCase())
                        );
                        setFilteredCars(filtered);
                    }}
                />
                <FlatList
                    data={searchTerm ? filteredCars : favoriteCars}
                    keyExtractor={(item) => item.id.toString()}
                    refreshing={refreshing}
                    onRefresh={refreshFavoriteCars}
                    renderItem={({ item }) => (
                        <Pressable
                            style={styles.listItem}
                            onPress={() => setSelectedCar(item)}
                        >
                            <Text style={styles.carName}>{`${item.name} (${item.year})`}</Text>
                        </Pressable>
                    )}
                />
                {selectedCar && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={!!selectedCar}
                        onRequestClose={() => setSelectedCar(null)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalWindow}>
                                <Text style={styles.modalHeader}>{`${selectedCar.name}`}</Text>
                                <Text style={styles.modalText}>Year: {selectedCar.year}</Text>
                                <Text style={styles.modalText}>Type: {selectedCar.type}</Text>
                                <Text style={styles.modalText}>Fuel Type: {selectedCar.fuel_type}</Text>
                                <Text style={styles.modalText}>Top Speed: {selectedCar.top_speed_kmh} km/h</Text>
                                <Text style={styles.modalText}>
                                    Acceleration (0-100): {selectedCar.acceleration_0_to_100_kmh}s
                                </Text>
                                <Text style={styles.modalText}>Horsepower: {selectedCar.horsepower}</Text>
                                <Text style={styles.modalText}>
                                    Transmission: {selectedCar.transmission}
                                </Text>
                                <Text style={styles.modalText}>
                                    Seating Capacity: {selectedCar.seating_capacity}
                                </Text>
                                <Pressable
                                    style={styles.heartButton}
                                    onPress={() => toggleHeartStatus(selectedCar)}
                                >
                                    {selectedCar.Heart ? <AntDesign name="heart" size={24} color="red" /> :
                                        <AntDesign name="hearto" size={24} color="black" />
                                    }
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.closeButton]}
                                    onPress={() => setSelectedCar(null)}
                                >
                                    <Text style={styles.buttonText}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </View>
    )
}