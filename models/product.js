class Product {
    constructor(id, name, label, expiryDate, quantity, unit, toBuy, photo) {
        this.id = id,
        this.name = name;
        this.label = label;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.unit = unit;
        this.toBuy = toBuy;
        this.photo = photo;
    }
}

export default Product;