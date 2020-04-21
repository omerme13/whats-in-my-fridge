import * as actions from "../actions/shoppingList";

const initialState = {
    listItems: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_TO_SHOPPING_LIST:
            return {
                ...state,
                listItems: state.listItems.concat(action.listItem)
            };

        case actions.DELETE_FROM_SHOPPING_LIST:
            const listItemsAfterDelete = [...state.listItems];
            const deletedItemIndex = listItemsAfterDelete.findIndex(
                item => item.id === action.listItemId
            );

            listItemsAfterDelete.splice(deletedItemIndex, 1);

            return {
                ...state,
                listItems: listItemsAfterDelete
            };

        case actions.UPDATE_LIST_ITEM:
            const updatedListItems = [...state.listItems];
            const itemIndex = updatedListItems.findIndex(
                item => item.id === action.listItem.id
            );

            updatedListItems.splice(itemIndex, 1, action.listItem);

            return {
                ...state,
                listItems: updatedListItems
            };

        case actions.LOAD_SHOPPING_LIST:
            return {
                listItems: action.listItems
            };

    }
    return state;
};

export default reducer;
