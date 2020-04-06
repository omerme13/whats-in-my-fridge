import Product from '../models/product';

export const PRODUCTS = [
    new Product('banana', 'banana', 'fruits', new Date(), 5, 'pcs', false),
    new Product('cheese', 'cheese', 'dairy', new Date(), 1, 'pcs', false),
    new Product('milk', 'milk', 'dairy', new Date(), 2, 'pcs', false),
    new Product('steak', 'steak', 'meat', new Date(), 2, 'pcs', false),
    new Product('cucumber', 'cucumber', 'vegetables', new Date(), 12, 'pcs', false),
    new Product('apple', 'apple', 'fruits', new Date(), 7, 'pcs', false),
];