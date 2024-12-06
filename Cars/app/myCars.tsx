import { FavoriteCars } from "@/Components/FavoriteCars";
import { styles } from "@/styles/style";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const myCars = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack.Screen options={{ title: "Favorite Cars" }}></Stack.Screen>
            <Text style={styles.stickyText}>All your favorite cars!</Text>
            <FavoriteCars />
        </View>
    );
}
export default myCars;