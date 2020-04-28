import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../screens/About";
import { navOptions, addMenuButton } from "./options";

const Stack = createStackNavigator();

const AboutNavigator = props => (
    <Stack.Navigator>
        <Stack.Screen
            name="About"
            component={About}
            options={{ ...navOptions, ...addMenuButton(props) }}
        />
    </Stack.Navigator>
);

export default AboutNavigator;
