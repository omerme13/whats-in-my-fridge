export const ADD_TO_SHOPPING_LIST = 'ADD_TO_SHOPPING_LIST';
export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const DELETE_FROM_SHOPPING_LIST = 'DELETE_FROM_SHOPPING_LIST';

export const addToShoppingList = (listItem) => {
    return {
        type: ADD_TO_SHOPPING_LIST,
        listItem
    }
};

export const updateListItem = (listItem) => {
    return {
        type: UPDATE_LIST_ITEM,
        listItem
    }
};

export const deleteFromShoppingList = (itemId) => {
    return {
        type: DELETE_FROM_SHOPPING_LIST,
        itemId
    }
};
