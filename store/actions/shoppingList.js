export const ADD_TO_SHOPPING_LIST = 'ADD_TO_SHOPPING_LIST';
export const UPDATE_LIST_ITEM = 'UPDATE_LIST_ITEM';
export const DELETE_FROM_SHOPPING_LIST = 'DELETE_FROM_SHOPPING_LIST';
export const LOAD_SHOPPING_LIST = 'LOAD_SHOPPING_LIST';

import { fetchShoppingListFromDB } from '../../utils/db';

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

export const loadShoppingList = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchShoppingListFromDB();
            dispatch({
                type: LOAD_SHOPPING_LIST,
                listItems: dbResult.rows._array
            });
        } catch (err) {
            throw err;
        }
    }
};