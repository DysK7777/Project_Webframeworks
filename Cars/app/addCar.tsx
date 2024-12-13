import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import { Stack } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { Picker } from '@react-native-picker/picker';

const addCar = () => {
    const [carModels, setCarModels] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4' };
        const baseURL = "https://sampleapis.assimilate.be/car/models";
        const fetchCarModels = async () => {
            try {
                const response = await fetch(`${baseURL}?name.first=Bender`, { headers });
                const data: CarModel[] = await response.json();
                data.forEach(car => {
                    if (car.Heart == undefined)
                        car.Heart = false
                });
                setCarModels(data);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        };

        fetchCarModels();
        setLoading(false)
    }, []);
    const [car, setCar] = useState<CarModel>({
        id: 0,
        name: '',
        brand_id: 0,
        type: '',
        year: 0,
        fuel_type: '',
        top_speed_kmh: 0,
        acceleration_0_to_100_kmh: 0,
        horsepower: 0,
        transmission: '',
        seating_capacity: 0,
        Heart: false
    });


    const handleInputChange = (field: string, value: string | number) => {
        setCar({ ...car, [field]: value });
    };
    const handleSubmit = () => {
        if (!car.name || !car.year) {
            Alert.alert('Validation Error', 'Please fill in all required fields');
            return;
        }

        const highestId = carModels.reduce((maxId, car) => Math.max(car.id, maxId), 0);
        const inputCar = { 
            id: highestId + 1,
            name: car.name,
            brand_id: parseInt(car.brand_id.toString()),
            type: car.type,
            year: parseInt(car.year.toString()),
            fuel_type: car.fuel_type,
            top_speed_kmh: parseInt(car.top_speed_kmh.toString()),
            acceleration_0_to_100_kmh: parseInt(car.acceleration_0_to_100_kmh.toString()),
            horsepower: parseInt(car.horsepower.toString()),
            transmission: car.transmission,
            seating_capacity: parseInt(car.seating_capacity.toString()),
            Heart: false
        }
        console.log(inputCar)
        fetch("https://sampleapis.assimilate.be/car/models", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4"
            },
            body: JSON.stringify(inputCar)
        })
            .then((response) => {
                return response.json().catch((error) => {
                    console.error('JSON parse error:', error);
                    throw new Error('Failed to parse JSON response');
                });
            })
            .then((data) => {
                setCarModels([...carModels, car])
                Alert.alert('Car Saved', `${car.name} (${car.year})`);
                // Reset all fields to empty
                setCar({
                    id: 0,
                    name: '',
                    brand_id: 0,
                    type: '',
                    year: 0,
                    fuel_type: '',
                    top_speed_kmh: 0,
                    acceleration_0_to_100_kmh: 0,
                    horsepower: 0,
                    transmission: '',
                    seating_capacity: 0,
                    Heart: false
                });
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', error.message);
            })
    };
    return (
        <View
            style={{
                paddingTop: 20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10, // Add padding to make the container smaller
            }}
        >
            <Stack.Screen options={{ title: "Add a car" }}></Stack.Screen>
            <Text style={styles.stickyText}>Feel free to add your own car model</Text>
            <Text style={styles.carModels}>Enter Car Details</Text>
            <ScrollView contentContainerStyle={{ ...styles.container, padding: 10 }}>
                <Text style={styles.label}>Name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter car name"
                    value={car.name}
                    onChangeText={(value) => handleInputChange('name', value)}

                />

                <Text style={styles.label}>Brand ID</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter brand ID"
                    value={car.brand_id.toString()}
                    onChangeText={(value) => handleInputChange('brand_id', value)}
                />

                <Text style={styles.label}>Type</Text>
                <Picker
                    selectedValue={car.type}
                    style={styles.input}
                    onValueChange={(value) => handleInputChange('type', value)}
                >
                    <Picker.Item label="SUV" value="SUV" />
                    <Picker.Item label="Coupe" value="Coupe" />
                    <Picker.Item label="Sedan" value="Sedan" />
                    <Picker.Item label="Pickup" value="Pickup" />
                    <Picker.Item label="Sports" value="Sports" />
                    <Picker.Item label="Hatchback" value="Hatchback" />
                </Picker>

                <Text style={styles.label}>Year *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter year"
                    value={car.year.toString()}
                    onChangeText={(value) => handleInputChange('year', value)}
                />

                <Text style={styles.label}>Fuel Type</Text>
                <Picker
                    selectedValue={car.fuel_type}
                    style={styles.input}
                    onValueChange={(value) => handleInputChange('fuel_type', value)}
                >
                    <Picker.Item label="Petrol" value="Petrol" />
                    <Picker.Item label="Diesel" value="Diesel" />
                    <Picker.Item label="LPG" value="LPG" />
                </Picker>

                <Text style={styles.label}>Top Speed (km/h)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter top speed"
                    value={car.top_speed_kmh.toString()}
                    onChangeText={(value) => handleInputChange('top_speed_kmh', value)}
                />

                <Text style={styles.label}>Acceleration 0-100 km/h (s)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter acceleration"
                    value={car.acceleration_0_to_100_kmh.toString()}
                    onChangeText={(value) => handleInputChange('acceleration_0_to_100_kmh', value)}
                />

                <Text style={styles.label}>Horsepower</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter horsepower"
                    value={car.horsepower.toString()}
                    onChangeText={(value) => handleInputChange('horsepower', value)}
                />

                <Text style={styles.label}>Transmission</Text>
                <Picker
                    selectedValue={car.transmission}
                    style={styles.input}
                    onValueChange={(value) => handleInputChange('transmission', value)}
                >
                    <Picker.Item label="Automatic" value="Automatic" />
                    <Picker.Item label="Clutch" value="Clutch" />
                </Picker>

                <Text style={styles.label}>Seating Capacity</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter seating capacity"
                    value={car.seating_capacity.toString()}
                    onChangeText={(value) => handleInputChange('seating_capacity', value)}
                />

                <Button title="Save Car" onPress={handleSubmit} />
            </ScrollView>
        </View>
    )
        ;
}
export default addCar;