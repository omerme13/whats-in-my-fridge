import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShoppingList from '../screens/ShoppingList';
import { navOptions } from './options';

const Stack = createStackNavigator();

const ShoppingListNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Shopping List"
            component={ShoppingList}
            options={navOptions} 
        />
    </Stack.Navigator>
);

export default ShoppingListNavigator;


