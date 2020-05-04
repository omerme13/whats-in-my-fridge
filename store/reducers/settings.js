import * as actions from "../actions/settings";

const initialState = {
    sortFridgePref : { sortBy: 'id', direction: 1 },
    sortListPref: { sortBy: 'id', direction: 1 },
    viewPref: 'regular'
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
    
        case actions.LOAD_SETTINGS:
            return action.settings;
    }

    return state;
};

export default reducer;
