import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ShoppingListNavigator from "./ShoppingListNavigator";
import ProductsNavigator from "./FridgeNavigator";
import { tabOptions } from './options';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName = route.name === 'My Fridge' ? 'fridge' : 'cart';
        size = focused ? size + 2 : size - 1;

        return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
    }
});

const TabNavigator = () => {
    return (
        <Tab.Navigator tabBarOptions={tabOptions} screenOptions={screenOptions}>
            <Tab.Screen name="My Fridge" component={ProductsNavigator} />
            <Tab.Screen name="Shopping List" component={ShoppingListNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator;
