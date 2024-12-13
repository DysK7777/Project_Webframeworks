import { styles } from "@/styles/style"
import { CarModel, CarModelProps } from "@/types"
import AntDesign from "@expo/vector-icons/AntDesign"
import React, { useState } from "react"
import { Modal, Pressable, View, Text } from "react-native"


export const CarModal = ({selectedCar,setSelectedCar,toggleHeartStatus}:CarModelProps)=> {
    return(
        <View>
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
        </View>
    )
}