import { CarModel, CarModelHeart } from "@/types";
import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, Pressable, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ShowCars } from "@/Components/ShowCars";


const Index = () => {
  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{title: "index"}}></Stack.Screen>
      <Text style={styles.stickyText}>Feel free to look at any car!</Text>
      <ShowCars/>
      
    </View>
  );
}
const styles = StyleSheet.create({
  
  stickyText: {
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
export default Index;