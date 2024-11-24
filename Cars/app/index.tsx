import { Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { ShowCars } from "@/Components/ShowCars";


const index = () => {
  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{title: "home"}}></Stack.Screen>
      <Text style={styles.stickyText}>Feel free to look at any car!</Text>
      <ShowCars/>
      
    </View>
  );
}
const styles = StyleSheet.create({
  
  stickyText: {
    paddingTop:32,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'grey',
    color: '#fff',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    zIndex: 10, // Ensures it stays on top of other components
  },
});
export default index;