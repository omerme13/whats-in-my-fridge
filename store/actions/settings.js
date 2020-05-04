import { AsyncStorage } from 'react-native';

export const ADD_PREFERENCE = 'ADD_PREFERENCE';
export const CHANGE_FRIDGE_VIEW = 'CHANGE_FRIDGE_VIEW';
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

export const loadSettings = () => {
    return async dispatch => {
        try {
            const sortFridgePref = JSON.parse(await AsyncStorage.getItem('sortFridgePref'));
            const sortListPref = JSON.parse(await AsyncStorage.getItem('sortListPref'));
            const viewPref = await AsyncStorage.getItem('viewPref');
          
            dispatch({
                type: LOAD_SETTINGS,
                settings: {
                    sortFridgePref,
                    sortListPref,
                    viewPref
                }
            })
        } catch (err) {
            throw err;
        }
    }
}