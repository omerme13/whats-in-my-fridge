import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Products from './components/screens/Products';
import ProductsNavigator from './components/navigation/Navigator';

// const Drawer = createDrawerNavigator();

const fetchFonts = () => {
    return Font.loadAsync({
        'lato': require('./assets/fonts/Lato-Medium.ttf'),
        'lato-bold': require('./assets/fonts/Lato-Bold.ttf')
    });
}

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    if (!isLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts} 
                onFinish={() => setIsLoaded(true)} 
                onError={err => console.log(err)}
            />
        );
    }

    return (
        <NavigationContainer>
            <ProductsNavigator />
        </NavigationContainer>
    );
}
