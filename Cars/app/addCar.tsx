import { styles } from "@/styles/style";
import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";

const addCar = () => {
    // const [name, setName] = useState<string>("");
    // const [brand_id, setBrand_id] = useState<number>(0);
    // const [type, setType] = useState<string>("");
    // const [year, setYear] = useState<number>(0);
    // const [fuel_type, setFuel_type] = useState<string>("");
    // const [top_speed_kmh, setTop_speed_kmh] = useState<number>(0);
    // const [acceleration_0_to_100_kmh, setAcceleration_0_to_100_kmh] = useState<number>(0);
    // const [horsepower, setHorsepower] = useState<number>(0);
    // const [transmission, setTransmission] = useState<string>("");
    // const [seating_capacity, setSeating_capacity] = useState<number>(0);
    const [car, setCar] = useState({
        name: '',
        brand_id: '',
        type: '',
        year: '',
        fuel_type: '',
        top_speed_kmh: '',
        acceleration_0_to_100_kmh: '',
        horsepower: '',
        transmission: '',
        seating_capacity: '',
    });


    const handleInputChange = (field, value) => {
        setCar({ ...car, [field]: value });
    };

    const handleSubmit = () => {
        // Example validation
        if (!car.name || !car.type || !car.year) {
            Alert.alert('Validation Error', 'Please fill in all required fields');
            return;
        }

        Alert.alert('Car Saved', `Car details:\n${JSON.stringify(car, null, 2)}`);
        // Save or process the data as needed
    };
    return (
        <View
            style={{
                paddingTop:20,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack.Screen options={{ title: "Add a car" }}></Stack.Screen>
            <Text style={styles.stickyText}>Feel free to add your own car model</Text>
            <Text style={styles.carModels}>Enter Car Details</Text>
            <ScrollView contentContainerStyle={styles.container}>
                

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

                <Text style={styles.label}>Type *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter car type"
                    value={car.type}
                    onChangeText={(value) => handleInputChange('type', value)}
                />

                <Text style={styles.label}>Year *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter year"
                    value={car.year.toString()}
                    onChangeText={(value) => handleInputChange('year', value)}
                />

                <Text style={styles.label}>Fuel Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter fuel type"
                    value={car.fuel_type}
                    onChangeText={(value) => handleInputChange('fuel_type', value)}
                />

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
                <TextInput
                    style={styles.input}
                    placeholder="Enter transmission type"
                    value={car.transmission}
                    onChangeText={(value) => handleInputChange('transmission', value)}
                />

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