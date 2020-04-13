class Product {
    constructor(id, name, label, expiryDate, quantity, unit, toBuy, photo, listItemId) {
        this.id = id,
        this.name = name;
        this.label = label;
        this.expiryDate = expiryDate;
        this.quantity = quantity;
        this.unit = unit;
        this.toBuy = toBuy;
        this.photo = photo;
        this.listItemId = listItemId;
    }
}

export default Product;