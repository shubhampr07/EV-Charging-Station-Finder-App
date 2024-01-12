import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './../Screens/HomeScreen/HomeScreen';
import FavouriteScreen from './../Screens/FavouriteScreen/FavouriteScreen';
import ProfileScreen from './../Screens/ProfileScreen/ProfileScreen';
import Colors from '../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false
    }}>
        <Tab.Screen name='Home' component={HomeScreen} options={{
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <Ionicons name='home' size={24} color={color} />
            )
        }} />
        <Tab.Screen name='Favourite' component={FavouriteScreen} options={{
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="ios-heart" size={24} color={color} />
            )
        }} />
        <Tab.Screen name='Profile' component={ProfileScreen} options={{
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon: ({color, size}) => (
                <FontAwesome name='user-circle' size={24} color={color} />
            )
        }} />
    </Tab.Navigator>
  )
}