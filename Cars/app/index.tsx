import { Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { ShowCars } from "@/Components/ShowCars";
import { styles } from "@/styles/style";


const index = () => {
  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ title: "home" }}></Stack.Screen>
      <Text style={styles.stickyText}>Feel free to look at any car!</Text>
      <ShowCars />

    </View>
  );
}

export default index;