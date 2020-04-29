import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';

import Spinner from '../UI/Spinner';
import DrawerNavigator from './DrawerNavigator';
import { loadSettings } from '../../store/actions/settings';


const MainNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(loadSettings());
            setIsLoading(false);
        })()
    }, [dispatch]);
    
    if (isLoading) {
        return <Spinner />
    }

    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    ) 
};

export default MainNavigator;
