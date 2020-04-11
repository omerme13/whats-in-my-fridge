export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

import { fetchProductsFromDB } from '../../utils/db';
import { convertToJsDate } from '../../utils/convert';

export const updateProduct = product => {
    return {
        type: UPDATE_PRODUCT,
        product
    }
};

export const createProduct = product => {
    return {
        type: CREATE_PRODUCT,
        product
    }
};

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        productId
    }
};

export const loadProducts = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchProductsFromDB();
            
            dispatch({
                type: LOAD_PRODUCTS,
                products: dbResult.rows._array.map(prod => {
                    if (prod.expiryDate) {
                        prod.expiryDate = convertToJsDate(prod.expiryDate);
                    }

                    return prod;
                })
            });
        } catch (err) {
            throw err;
        }
    }
};

