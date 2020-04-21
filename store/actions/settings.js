import { AsyncStorage } from 'react-native';

export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

export const addPreference = pref => {
    AsyncStorage.setItem('sortPref', JSON.stringify(pref));

    return {
        type: ADD_PREFERENCE,
        pref
    };

      
}

export const loadSettings = () => {
    return async dispatch => {
        try {
            const sortPref = JSON.parse(await AsyncStorage.getItem('sortPref'));
          
            dispatch({
                type: LOAD_SETTINGS,
                settings: {
                    sortPref
                }
            })
        } catch (err) {
            throw err;
        }
    }
}