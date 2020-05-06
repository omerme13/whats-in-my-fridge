import * as actions from "../actions/settings";

const initialState = {
    sortFridgePref : { sortBy: 'id', direction: 1 },
    sortListPref: { sortBy: 'id', direction: 1 },
    viewPref: 'regular',
    areAmericanUnits: false,
    isLongDate :false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PREFERENCE:
            return {
                ...state,
                [action.name]: action.pref
            };
        case actions.CHANGE_FRIDGE_VIEW:
            return {
                ...state,
                viewPref: action.view
            };
        case actions.TOGGLE_AMERICAN_UNITS:
            return {
                ...state,
                areAmericanUnits: action.pref
            };

        case actions.TOGGLE_LONG_DATE:
            return {
                ...state,
                isLongDate: action.pref
            };
            
        case actions.LOAD_SETTINGS:
            return action.settings || state;
    }

    return state;
};

export default reducer;
