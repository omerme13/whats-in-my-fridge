import { AsyncStorage } from 'react-native';

export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const CHANGE_FRIDGE_VIEW = 'CHANGE_FRIDGE_VIEW';
export const TOGGLE_AMERICAN_UNITS = 'TOGGLE_AMERICAN_UNITS';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';

export const addPreference = (name, pref) => {
    AsyncStorage.setItem(name, JSON.stringify(pref));

    return {
        type: ADD_PREFERENCE,
        name,
        pref
    };
};

export const changeFridgeView = view => {
    AsyncStorage.setItem('viewPref', view);

    return {
        type: CHANGE_FRIDGE_VIEW,
        view
    };
};

export const toggleAmericanUnits = pref => {
    AsyncStorage.setItem('areAmericanUnits', JSON.stringify(pref));

    return {
        type: TOGGLE_AMERICAN_UNITS,
        pref
    };
};

export const loadSettings = () => {
    return async dispatch => {
        try {
            const sortFridgePref = JSON.parse(await AsyncStorage.getItem('sortFridgePref'));
            const sortListPref = JSON.parse(await AsyncStorage.getItem('sortListPref'));
            const viewPref = await AsyncStorage.getItem('viewPref');
            const areAmericanUnits = JSON.parse(await AsyncStorage.getItem('areAmericanUnits'));
          
            dispatch({
                type: LOAD_SETTINGS,
                settings: {
                    sortFridgePref,
                    sortListPref,
                    viewPref,
                    areAmericanUnits
                }
            })
        } catch (err) {
            throw err;
        }
    }
}