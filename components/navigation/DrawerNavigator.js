import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';
import SettingsNavigator from './SettingsNavigator';
import AboutNavigator from './AboutNavigator';
import { colors } from '../../utils/variables';

const Drawer = createDrawerNavigator();

const screenOptions = ({ route }) => ({
    drawerIcon: ({ focused }) => {
        let iconName;
        switch (route.name) {
            case 'Products':
                iconName = 'food';
                break;
            case 'Settings':
                iconName = 'settings';
                break;
            case 'About':
                iconName = 'information-outline';
                break;
            default: break;
        }

        return (
            <MaterialCommunityIcons
                name={iconName}
                size={23}
                color={focused ? colors.primary : colors.textLight}
            /> 
        ) 
    }
})

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={DrawerContent}
            drawerContentOptions={{activeTintColor: colors.primary}}
            screenOptions={screenOptions}
        >
            <Drawer.Screen name="Products" component={TabNavigator} />
            <Drawer.Screen name="Settings" component={SettingsNavigator} />
            <Drawer.Screen name="About" component={AboutNavigator} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
