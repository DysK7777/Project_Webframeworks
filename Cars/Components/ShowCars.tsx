import { CarModel, CarModelHeart } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, Modal, StyleSheet } from "react-native";

export const ShowCars = () => {

    const [carModels, setCarModels] = useState<CarModel[]>([]);
    const [likedCarModels, setLikedCarModels] = useState<CarModelHeart[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLoading(true)
        // Fetch the car models data
        const fetchCarModels = async () => {
            try {
                const response = await fetch('https://sampleapis.assimilate.be/car/models');
                const data: CarModel[] = await response.json();
                setCarModels(data);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        };

        fetchCarModels();
        setLoading(false)
    }, []);

    const pressLiked = (car:CarModel) => {
        setLiked(!liked)
        if(liked) setLikedCarModels([...likedCarModels,{Car:car,Heart:true}])
    }

//...prev, { car, liked: true }
    return (
        <View style={styles.paddingTop}>
            {loading && <Text>Chill, give me a break!</Text>}
            <Text style={styles.carModels}>Car Models</Text>
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
                            <Text style={styles.modalHeader}>{`${selectedCar.name} ${<Pressable><AntDesign name="heart" size={24} color="red" /></Pressable>}`}</Text>
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
                                onPress={() => pressLiked(selectedCar)} // Toggle heart color
                                style={styles.heartButton}
                            >
                                <Text style={[styles.heart, { color: selectedCar ? 'red' : 'black' }]}>
                                    ♥
                                </Text>
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
const styles = StyleSheet.create({
    
    paddingTop:{
      marginTop:50
    },
    carModels:{
      fontWeight:"bold",
      fontSize:20
    },
    
    listItem: {
      padding: 15,
      backgroundColor: '#fff',
      marginBottom: 10,
      borderRadius: 5,
      elevation: 3,
    },
    carName: {
      fontSize: 16,
      color: '#333',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed overlay
    },
    modalWindow: {
      width: '90%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
    },
    modalHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 10,
      color: '#333',
    },
    button: {
      backgroundColor: '#6200ee',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    closeButton: {
      backgroundColor: '#e53935',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    heartButton: {
      marginTop: 20,
    },
    heart: {
      fontSize: 30,
      fontWeight: 'bold',
    },
  });