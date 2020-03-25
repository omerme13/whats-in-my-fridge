import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Products from '../screens/Products';
import { colors } from '../../utils/variables';

const Stack = createStackNavigator();

const navOptions = {
    headerStyle: {
        backgroundColor: colors.primary
    },
    headerTintColor: 'white',
    headerTitleStyle: {
        letterSpacing: 1,
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
    </Stack.Navigator>
);

export default ProductsNavigator;


