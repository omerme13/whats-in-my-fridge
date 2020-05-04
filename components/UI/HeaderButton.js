import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const headerButton = props => {
    return (
        <HeaderButton 
            {...props}
            iconName={props.iconName}
            IconComponent={props.community ? MaterialCommunityIcons : MaterialIcons} 
            iconSize={23}
            color={props.color ? props.color : 'whitesmoke'}
        />
    ) 
};

export default headerButton; 