import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Fridge from '../screens/Fridge';
import ProductDetails from '../screens/ProductDetails';
import ProductAddEdit from '../screens/ProductAddEdit';
import FilteredFridge from '../screens/FilteredFridge';
import { navOptions, addMenuButton } from './options';

const Stack = createStackNavigator();

const FridgeNavigator = props => (
    <Stack.Navigator screenOptions={navOptions}>
        <Stack.Screen 
            name="Fridge"
            component={Fridge}
            options={addMenuButton(props)} // add menu button in addition to the default options
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Product" component={ProductAddEdit} />
        <Stack.Screen name="FilteredFridge" component={FilteredFridge} />
    </Stack.Navigator>
);

export default FridgeNavigator;
