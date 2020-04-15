import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShoppingList from '../screens/ShoppingList';
import ListItemAddEdit from '../screens/ListItemAddEdit';
import FilteredShoppingList from '../screens/FilteredShoppingList';
import { navOptions } from './options';

const Stack = createStackNavigator();

const ShoppingListNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Shopping List"
            component={ShoppingList}
            options={navOptions} 
        />
        <Stack.Screen 
            name="ListItem"
            component={ListItemAddEdit}
            options={navOptions} 
        />
        <Stack.Screen 
            name="FilteredShoppingList"
            component={FilteredShoppingList}
            options={navOptions} 
        />
    </Stack.Navigator>
);

export default ShoppingListNavigator;


