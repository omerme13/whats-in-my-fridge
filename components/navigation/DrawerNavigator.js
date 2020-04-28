import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabNavigator from './TabNavigator';
import SettingsNavigator from './SettingsNavigator';
import AboutNavigator from './AboutNavigator';
import { colors } from '../../utils/variables';

const Drawer = createDrawerNavigator();

const renderIcon = name => (
    <MaterialCommunityIcons name={name} size={23} color={colors.primary} />
);

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
                component={SettingsNavigator}
                options={{drawerIcon: () => renderIcon('settings')}}
            />
            <Drawer.Screen
                name="About"
                component={AboutNavigator}
                options={{drawerIcon: () => renderIcon('information-outline')}}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
