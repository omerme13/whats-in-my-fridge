import React from 'react';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { colors } from '../../utils/variables';
import HeaderButton from "../HeaderButton";

export const navOptions = {
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

export const addMenuButton = props => ({
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="menu"    
                iconName="menu"
                onPress={() => props.navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
});

export const tabOptions = {
    activeTintColor: colors.secondary,
    labelStyle: {
        fontSize: 12,
        fontFamily: 'lato-bold'
    }
};