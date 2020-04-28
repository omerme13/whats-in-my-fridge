import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Fridge from '../screens/Fridge';
import ProductDetails from '../screens/ProductDetails';
import ProductAddEdit from '../screens/ProductAddEdit';
import FilteredFridge from '../screens/FilteredFridge';
import { navOptions, addMenuButton } from './options';

const Stack = createStackNavigator();

const FridgeNavigator = props => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Fridge"
            component={Fridge}
            options={{...navOptions, ...addMenuButton(props)}} 
        />
        <Stack.Screen 
            name="ProductDetails"
            component={ProductDetails}
            options={navOptions} 
        />
        <Stack.Screen 
            name="Product"
            component={ProductAddEdit}
            options={navOptions} 
        />
        <Stack.Screen 
            name="FilteredFridge"
            component={FilteredFridge}
            options={navOptions} 
        />
    </Stack.Navigator>
);

export default FridgeNavigator;


