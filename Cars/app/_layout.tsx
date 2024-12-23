import { Tabs } from "expo-router";
import React from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the dynamic route.
        name="index"
        options={{
          headerShown: false,
          title: 'index',
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="home"
              size={24}
              color={focused ? 'black' : 'grey'}
            />)
        }}
      />
      <Tabs.Screen
        // Name of the dynamic route.
        name="addCar"
        options={{
          headerShown: false,
          title: 'Add a car',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="car-outline"
              size={24}
              color={focused ? 'black' : 'grey'}
            />)
        }}
      />
      <Tabs.Screen
        // Name of the dynamic route.
        name="myCars"
        options={{
          headerShown: false,
          title: 'My cars',
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="star-outlined"
              size={24}
              color={focused ? 'black' : 'grey'}
            />)
        }}
      />
      <Tabs.Screen
        // Name of the dynamic route.
        name="profileCars"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="user"
              size={24}
              color={focused ? 'black' : 'grey'}
            />)
        }}
      />
    </Tabs>
  );
}

export default RootLayout;