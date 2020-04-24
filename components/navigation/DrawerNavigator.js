import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, TouchableOpacity } from 'react-native'

import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const Dummy = props => {
    return (
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <Text>Hello</Text>
            <Text>Hello</Text>
        </TouchableOpacity>
    )
};

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Dummy" component={Dummy} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
