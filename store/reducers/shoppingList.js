import * as actions from '../actions/shoppingList';

const initialState = {
    listItems: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.ADD_TO_SHOPPING_LIST:
            return {
                ...state,
                listItems: {...state.listItems,[action.listItem.id]: action.listItem}
            }

        case actions.DELETE_FROM_SHOPPING_LIST:
            const listItemsAfterDelete = {...state.listItems};
            delete listItemsAfterDelete[action.itemId];

            return {
                ...state,
                listItems: listItemsAfterDelete
            }
            
        case actions.LOAD_SHOPPING_LIST:
            return {
                listItems: action.listItems
            }
    }
    return state;
};

export default reducer;