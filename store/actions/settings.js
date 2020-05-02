import { AsyncStorage } from 'react-native';

export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const CHANGE_FRIDGE_COLUMNS = 'CHANGE_FRIDGE_COLUMNS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

export const addPreference = (name, pref) => {
    AsyncStorage.setItem(name, JSON.stringify(pref));

    return {
        type: ADD_PREFERENCE,
        name,
        pref
    };
};

export const changeFridgeColumns = isOneColumn => {
    AsyncStorage.setItem('isOneColumn', JSON.stringify(isOneColumn));

    return {
        type: CHANGE_FRIDGE_COLUMNS,
        isOneColumn
    };
};

export const loadSettings = () => {
    return async dispatch => {
        try {
            const sortFridgePref = JSON.parse(await AsyncStorage.getItem('sortFridgePref'));
            const sortListPref = JSON.parse(await AsyncStorage.getItem('sortListPref'));
            const isOneColumn = JSON.parse(await AsyncStorage.getItem('isOneColumn'));
          
            dispatch({
                type: LOAD_SETTINGS,
                settings: {
                    sortFridgePref,
                    sortListPref,
                    isOneColumn
                }
            })
        } catch (err) {
            throw err;
        }
    }
}