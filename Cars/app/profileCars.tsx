import { styles } from "@/styles/style";
import { Stack } from "expo-router";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const profileCars = () => {
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0].uri;
                setImage(selectedImage);
                await AsyncStorage.setItem('profileImage', selectedImage);
            }
        }
    };

    const loadImage = async () => {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
            setImage(savedImage);
        }
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    useEffect(() => {
        loadImage();
        getLocation();
    }, []);

    return (
            <View style={styles.profilePageContainer}>
                <Stack.Screen options={{ title: "Profile" }}></Stack.Screen>
                <Text style={styles.stickyText}>Profile</Text>
                    <View style={styles.profileImageContainer}>
                        {image && <Image source={{ uri: image }} style={styles.profileImage} />}
                        <Pressable onPress={pickImage} style={styles.button}>
                            <Text style={styles.buttonText}>Choose Picture</Text>
                        </Pressable>
                    </View>
                    {location && (
                        <View style={styles.mapContainer}>
                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                    title="Your Location"
                                />
                            </MapView>
                        </View>

                    )}
            </View>

            );
}

            export default profileCars;