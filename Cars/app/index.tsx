import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "@/styles/style";
import { ShowCars } from "@/Components/ShowCars";

const index = () => {
  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        overflowY: "scroll"
      }}
    >
      <Stack.Screen options={{ title: "home" }}></Stack.Screen>
      <Text style={styles.stickyText}>Feel free to look at any car!</Text>
      <ShowCars />

    </View>
  );
}

export default index;