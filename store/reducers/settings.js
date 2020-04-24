import * as actions from "../actions/settings";

const initialState = {
    sortFridgePref : {},
    sortListPref: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PREFERENCE:
            return {
                ...state,
                [action.name]: action.pref
            };

        case actions.LOAD_SETTINGS:
            return action.settings;
    }

    // console.log(state) ;
    return state;
};

export default reducer;
