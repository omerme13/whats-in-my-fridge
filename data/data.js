import Product from '../models/product';

export const PRODUCTS = [
    new Product(1, 'banana', 'fruits', new Date(), 5),
    new Product(2, 'cheese', 'dairy', new Date(), 1),
    new Product(3, 'milk', 'dairy', new Date(), 2),
    new Product(4, 'steak', 'meat', new Date(), 2),
    new Product(5, 'cucumber', 'vegetables', new Date(), 12),
    new Product(6, 'apple', 'fruits', new Date(), 7),
];