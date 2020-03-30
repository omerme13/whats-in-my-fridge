import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons';

const headerButton = props => {
    return (
        <HeaderButton 
            {...props} 
            IconComponent={MaterialIcons} 
            iconSize={23}
            color={props.color ? props.color : 'white'}
        />
    ) 
};

export default headerButton; 