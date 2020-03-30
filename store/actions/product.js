export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const updateProduct = product => {
    return {
        type: UPDATE_PRODUCT,
        product
    }
};
