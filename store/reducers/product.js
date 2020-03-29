import { PRODUCTS } from '../../data/data';

const initialState = {
    productsInFridge: PRODUCTS,
    productsToBuy: PRODUCTS.filter(product => product.toBuy)
};

const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;