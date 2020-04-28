import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../screens/Settings";
import { navOptions, addMenuButton } from "./options";

const Stack = createStackNavigator();

const SettingsNavigator = props => (
    <Stack.Navigator>
        <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ ...navOptions, ...addMenuButton(props) }}
        />
    </Stack.Navigator>
);

export default SettingsNavigator;
