import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShoppingList from '../screens/ShoppingList';
import ListItemAddEdit from '../screens/ListItemAddEdit';
import FilteredShoppingList from '../screens/FilteredShoppingList';
import { navOptions, addMenuButton } from './options';

const Stack = createStackNavigator();

const ShoppingListNavigator = props => (
    <Stack.Navigator screenOptions={navOptions}>
        <Stack.Screen 
            name="Shopping List"
            component={ShoppingList}
            options={addMenuButton(props)} // add menu button in addition to the default options
        />
        <Stack.Screen name="ListItem" component={ListItemAddEdit} />
        <Stack.Screen name="FilteredShoppingList" component={FilteredShoppingList} />
    </Stack.Navigator>
);

export default ShoppingListNavigator;


