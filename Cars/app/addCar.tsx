import { styles } from "@/styles/style";
import { CarModel } from "@/types";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";

const addCar = () => {
    const [carModels, setCarModels] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        // Fetch the car models data
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
            //await AsyncStorage.setItem("FavoriteCars",)
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
    });


    const handleInputChange = (field: string, value: string) => {
        setCar({ ...car, [field]: value });
    };
    const handleSubmit = () => {
        // Example validation
        if (!car.name || !car.type || !car.year) {
            Alert.alert('Validation Error', 'Please fill in all required fields');
            return;
        }
        const idNumber = carModels.length + 1;
        // setCar({ ...car, id=idNumber });
        // Save or process the data as needed
        const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4' };
        const baseURL = "https://sampleapis.assimilate.be/car/models";
        fetch("https://sampleapis.assimilate.be/car/models", {
            method: "POST",
            headers: {
                'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDA0NTlAYXAuYmUiLCJpYXQiOjE3MzI0MDMxMTJ9.CNlshZOvpH-nK9ykEF7Ol_HsQlQhz8cjVwxENRIlpz4"
            },
            body: JSON.stringify(car)
        }
        ).then((response) => response.json())
            .then((data) => {
                setCarModels([...carModels, car])
                Alert.alert('Car Saved', `${car.name} (${car.year})`);
                console.log(data)
            })
            .catch((error) => {
                console.error(error);
            })
    };
    return (
        <View
            style={{
                paddingTop: 20,
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