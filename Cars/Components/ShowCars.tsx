import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Modal, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4
export const ShowCars = () => {

    const [carModels, setCarModels] = useState<CarModel[]>([]);
    const [filteredCars, setFilteredCars] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setLoading(true)
        // Fetch the car models data
        const fetchCarModels = async () => {
            try {
                const response = await fetch('https://sampleapis.assimilate.be/car/models');
                const data: CarModel[] = await response.json();
                data.forEach(car => {
                    if (car.Heart == undefined)
                        car.Heart = false
                });
                setCarModels(data);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
            //await AsyncStorage.setItem("FavoriteCars",)
        };

        fetchCarModels();
        setLoading(false)
    }, );

    const pressLiked = (selectedCar: CarModel) => {
        selectedCar.Heart = !selectedCar.Heart;
        setCarModels(
            carModels.map((car) =>
                car.id === selectedCar.id
                    ? { ...car, Heart: selectedCar.Heart } // Toggle Heart for the selected car
                    : { ...car, Heart: car.Heart } // Ensure others have Heart set to false
            )
        );
    }
    const changedSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTerm(e.target.value);
        setFilteredCars(carModels.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase())));
        console.log(filteredCars)
    }
    //...prev, { car, liked: true }
    return (
        <View style={styles.paddingTop}
        >
            {loading && <Text>Chill, give me a break!</Text>}
            <Text style={styles.carModels}>Car Models</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Audi.."
                    onChange={() => changedSearch}
                />

                {searchTerm != "" ?
                    <FlatList
                        data={filteredCars}
                        keyExtractor={(item) => item.id.toString()}
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
