import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ReduxThunk from 'redux-thunk';

import MainNavigator from './components/navigation/MainNavigator';
import productReducer from './store/reducers/product';
import shoppingListReducer from './store/reducers/shoppingList';
import settingsReducer from './store/reducers/settings';
import { init } from './utils/db';

init()
    .then(console.log('Initialized DB'))
    .catch(err => console.log(err))

const rootReducer = combineReducers({
    product: productReducer,
    shoppingList: shoppingListReducer,
    settings: settingsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
            <MainNavigator />
        </Provider>
    );
}
