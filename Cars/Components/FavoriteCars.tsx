import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, Pressable, View, Text } from "react-native";
interface FavoriteCarProps {
    cars: CarModel[],
    setSelectedCar: React.Dispatch<React.SetStateAction<CarModel>>
}
export const FavoriteCars = ({ cars, setSelectedCar }: FavoriteCarProps) => {

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [favoriteCars, setFavoriteCars] = useState<CarModel[]>([]);
    useEffect(() => {
        setLoading(true)
        const fetchCarModels = async () => {
            try {
                const value = await AsyncStorage.getItem("FavoriteCars");
                setFavoriteCars(value ? JSON.parse(value) : []);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
            //await AsyncStorage.setItem("FavoriteCars",)
        };

        fetchCarModels();
        setLoading(false)
    }, [refreshing]);
    const refresh = async () => {
        setRefreshing(true);
        // wait 2 seconds to simulate API call (or whatever)
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        setRefreshing(false);
    }
    return (
        <View>
            <FlatList
                data={cars}
                keyExtractor={(item) => item.id.toString()}
                refreshing={refreshing}
                onRefresh={() => refresh}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.listItem}
                        onPress={() => setSelectedCar(item)}
                    >
                        <Text style={styles.carName}>{`${item.name} (${item.year})`}</Text>
                    </Pressable>
                )}

            />
        </View>
    )
}