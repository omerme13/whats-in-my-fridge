import React from 'react';
import { useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigator';
import { loadSettings } from '../../store/actions/settings';

const MainNavigator = () => {
    const dispatch = useDispatch();
    dispatch(loadSettings());
    
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    ) 
};

export default MainNavigator;
