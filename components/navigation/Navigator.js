import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import ShoppingList from '../screens/ShoppingList';
import { colors } from '../../utils/variables';

const Stack = createStackNavigator();

const navOptions = {
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        letterSpacing: 1,
        textTransform: 'capitalize',
        fontFamily: 'lato-bold',
        fontWeight: null /* in order to let the font family work */
    }
};

const ProductsNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen 
            name="Products"
            component={Products}
            options={navOptions} 
        />
        <Stack.Screen 
            name="ProductDetails"
            component={ProductDetails}
            options={navOptions} 
        />
        <Stack.Screen 
            name="ShoppingList"
            component={ShoppingList}
            options={navOptions} 
        />
    </Stack.Navigator>
);

export default ProductsNavigator;


