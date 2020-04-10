import { PRODUCTS } from '../../data/data';
import * as actions from '../actions/product';

const initialState = {
    productsInFridge: PRODUCTS
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

        case actions.CREATE_PRODUCT:

            return {
                ...state,
                productsInFridge: state.productsInFridge.concat(action.product)
            };

        case actions.DELETE_PRODUCT:
            const deletedProductsInFridge = [...state.productsInFridge];
            const deletedItemIndex = deletedProductsInFridge.findIndex(item => (
                item.id === action.productId
            ));

            deletedProductsInFridge.splice(deletedItemIndex, 1);

            return {
                ...state,
                productsInFridge: deletedProductsInFridge
            };

            case actions.LOAD_PRODUCTS:

                return {
                    productsInFridge: action.products
                }
    }

    return state;
};

export default reducer;