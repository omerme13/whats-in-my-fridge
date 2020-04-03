import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ShoppingList from "../screens/ShoppingList";
import ProductsNavigator from "./ProductsNavigator";
import { colors } from "../../utils/variables";

const Tab = createBottomTabNavigator();

const tabOptions = {
    activeTintColor: colors.secondary,
    labelStyle: {
        fontSize: 12,
        fontFamily: 'lato-bold'
    }
};

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName = route.name === 'My Fridge' ? 'fridge' : 'cart';
        size = focused ? size + 2 : size - 1;

        return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
        );
    }
});

const TabNavigator = () => (
    <Tab.Navigator tabBarOptions={tabOptions} screenOptions={screenOptions}>
        <Tab.Screen name="My Fridge" component={ProductsNavigator} />
        <Tab.Screen name="Shopping List" component={ShoppingList} />
    </Tab.Navigator>
);

export default TabNavigator;
