import { Stack } from "expo-router";
import { Text, View } from "react-native";

const addCar = () => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack.Screen options={{title: "Add a car"}}></Stack.Screen>
            <Text>Edit app/index.tsx to edit this screen.</Text>
        </View>
    );
}
export default addCar;