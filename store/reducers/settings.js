import * as actions from "../actions/settings";

const initialState = {
    sortFridgePref : {},
    sortListPref: {},
    isOneColumn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PREFERENCE:
            return {
                ...state,
                [action.name]: action.pref
            };
        case actions.CHANGE_FRIDGE_COLUMNS:
            return {
                ...state,
                isOneColumn: action.isOneColumn
            };
    
        case actions.LOAD_SETTINGS:
            return action.settings;
    }

    // console.log({state})
    return state;
};

export default reducer;
