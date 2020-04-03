export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

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

