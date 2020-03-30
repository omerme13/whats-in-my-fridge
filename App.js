import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import ProductsNavigator from './components/navigation/Navigator';
import productReducer from './store/reducers/product';
import shoppingListReducer from './store/reducers/shoppingList';

const rootReducer = combineReducers({
    product: productReducer,
    shoppingList: shoppingListReducer
});

const store = createStore(rootReducer);

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
        <Provider store={store}>
            <NavigationContainer>
                <ProductsNavigator />
            </NavigationContainer>
        </Provider>
    );
}
