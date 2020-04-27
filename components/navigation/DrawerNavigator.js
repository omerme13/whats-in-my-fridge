import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabNavigator from './TabNavigator';
import Settings from '../screens/Settings';
import About from '../screens/About';
import { colors } from '../../utils/variables';

const Drawer = createDrawerNavigator();

const renderIcon = name => (
    <MaterialCommunityIcons name={name} size={23} color={colors.primary} />
);

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
        <Drawer.Navigator drawerContentOptions={{activeTintColor: colors.secondary}}>
            <Drawer.Screen
                name="Products"
                component={TabNavigator}
                options={{drawerIcon: () => renderIcon('food')}}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{drawerIcon: () => renderIcon('settings')}}
            />
            <Drawer.Screen
                name="About"
                component={About}
                options={{drawerIcon: () => renderIcon('information-outline')}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
