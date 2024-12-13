import { styles } from "@/styles/style";
import { CarSearchProps } from "@/types";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { View, TextInput, Pressable } from "react-native";

export const CarSearch = ({ searchTerm, setSearchTerm, carModels, setFilteredCars }: CarSearchProps) => {

    return (
            <View style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                placeholder="Audi.."
                value={searchTerm}
                onChangeText={(text) => {
                    setSearchTerm(text);
                    const filtered = carModels.filter((car) =>
                        car.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setFilteredCars(filtered);
                }}
            />
            <Pressable onPress={() => setSearchTerm('')} style={styles.clearButton}>
                <Feather name="x-circle" size={24} color="black" />
            </Pressable>
            </View>
    )
}