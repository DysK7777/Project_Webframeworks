import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, Pressable, Modal, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
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

    // const clearStorage = async () => {
    //     try {
    //         await AsyncStorage.clear();
    //         console.log("AsyncStorage cleared");
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

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
        setRefreshing(false);
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
                    //console.log('Favorite cars after adding:', favoriteCarsArray); // Debug log
                }
            } else {
                favoriteCarsArray = favoriteCarsArray.filter((car: CarModel) => car.id !== selectedCar.id);
                // console.log('Favorite cars after removing:', favoriteCarsArray); // Debug log
            }

            await AsyncStorage.setItem("FavoriteCars", JSON.stringify(favoriteCarsArray));
            refreshFavoriteCars(); // Refresh favorite cars list
            setRefreshing(true); // Trigger refresh
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.paddingTop}
        >

            {loading && <Text>Chill, give me a break!</Text>}
            <Text style={styles.carModels}>Car Models</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Audi.."
                    onChangeText={(text) => {
                        setSearchTerm(text);
                        const filtered = carModels.filter((car) =>
                            car.name.toLowerCase().includes(text.toLowerCase())
                        );
                        setFilteredCars(filtered);
                    }}
                />
                {/* <Pressable
                style={styles.closeButton}
                onPress={clearStorage}
            >
                <Text style={styles.buttonText}>Clear Storage</Text>
            </Pressable> */}
                {searchTerm != '' ?
                    <FlatList
                        data={filteredCars}
                        keyExtractor={(item) => item.id.toString()}
                        refreshing={refreshing}
                        onRefresh={refresh}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.listItem}
                                onPress={() => setSelectedCar(item)}
                            >
                                <Text style={styles.carName}>{`${item.name} (${item.year})`}</Text>
                            </Pressable>
                        )}

                    />
                    :
                    <FlatList
                        data={carModels}
                        keyExtractor={(item) => item.id.toString()}
                        refreshing={refreshing}
                        onRefresh={refresh}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.listItem}
                                onPress={() => setSelectedCar(item)}
                            >
                                <Text style={styles.carName}>{`${item.name} (${item.year})`}</Text>
                            </Pressable>
                        )}

                    />}


            </View>



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
                                onPress={() => {
                                    pressLiked(selectedCar);
                                }}
                                style={styles.heartButton}
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
    )
}
