import { styles } from "@/styles/style"
import { CarFlatlistProps, CarModel } from "@/types"
import AntDesign from "@expo/vector-icons/AntDesign"
import React from "react"
import { FlatList, View, Pressable, Text } from "react-native"


export const CarFlatlist = ({ refresh, searchTerm, filteredCars, carModels, refreshing, setSelectedCar, deleteCar }: CarFlatlistProps) => {
    return (
        <FlatList
            data={searchTerm ? filteredCars : carModels}
            keyExtractor={(item) => item.id.toString()}
            refreshing={refreshing}
            onRefresh={refresh}
            renderItem={({ item }) => (
                <View style={styles.listItem}>
                    <View style={styles.carInfo}>
                        <Pressable onPress={() => setSelectedCar(item)}>
                            <Text style={styles.carName}>{`${item.name} (${item.year})`}</Text>
                        </Pressable>
                        {deleteCar &&
                            <Pressable onPress={() => deleteCar!(item.id)} style={styles.deleteButton}>
                                <AntDesign name="delete" size={24} color="black" />
                            </Pressable>
                        }

                    </View>
                </View>
            )}
        />
    )
}