import { PRODUCTS } from '../../data/data';
import * as actions from '../actions/product';

const initialState = {
    productsInFridge: PRODUCTS,
    productsToBuy: PRODUCTS.filter(product => product.toBuy)
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.UPDATE_PRODUCT:
            const updatedProductsInFridge = [...state.productsInFridge];
            const itemIndex = updatedProductsInFridge.findIndex(item => (
                item.id === action.product.id
            ));

            updatedProductsInFridge.splice(itemIndex, 1, action.product);
            return {
                ...state,
                productsInFridge: updatedProductsInFridge
            };
    }

    return state;
};

export default reducer;