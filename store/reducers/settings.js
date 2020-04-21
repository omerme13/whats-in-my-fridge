import * as actions from "../actions/settings";

const initialState = {
    sortPref: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PREFERENCE:
            return {
                ...state,
                sortPref: action.pref
            };

        case actions.LOAD_SETTINGS:
            console.log(action.settings)
            return action.settings;
    }

    return state;
};

export default reducer;
