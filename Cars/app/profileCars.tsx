import { styles } from "@/styles/style";
import { Stack } from "expo-router";
import { View, Text, Pressable, Image } from "react-native";
import { useState } from "react";
import React from "react";

const profileCars = () => {


    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Stack.Screen options={{ title: "Profile" }}></Stack.Screen>
            <Text style={styles.stickyText}>Profile</Text>

        </View>
    );
}

export default profileCars;