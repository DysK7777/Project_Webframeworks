import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import { FlatList, Pressable, View, Text } from "react-native";
interface FavoriteCarProps {
    cars: CarModel[],
    setSelectedCar: React.Dispatch<React.SetStateAction<CarModel>>
}
export const FavoriteCars = ({ cars, setSelectedCar }: FavoriteCarProps) => {

    return (
        <View>
            <FlatList
                data={cars}
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
        </View>
    )
}