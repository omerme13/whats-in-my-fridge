const FORM_UPDATE = "FORM_UPDATE";
export const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.inputType]: action.inputValue
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.inputType]: action.isValid
        };

        let isFormValid;
        for (const key in updatedValidities) {
            if (!updatedValidities[key]) {
                isFormValid = false;
                break;
            }
            isFormValid = true;
        }

        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isFormValid
        };
    }
    
    return state;
};
