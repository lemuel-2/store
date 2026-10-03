export class Product {
    #name;
    #price;
    #stock;
    
    /**
     * Product constructor
     * @param {string} name 
     * @param {number} price 
     * @param {number} stock 
     */
    constructor(name, price, stock) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid Product name")
        }

        if (typeof price !== "number" || price < 0) {
            throw new Error("Invalid Product price")
        }

        if (typeof stock !== "number" || stock <= 0) {
            throw new Error("Invalid Product quantity")
        }

        this.#name = name;
        this.#price = price;
        this.#stock = stock;
    }

    // getter
    get name() { return this.#name }
    get price() { return this.#price }
    get stock() { return this.#stock }

    /**
     * Reduce the product quantity
     * if purchasing item
     * @param {number} quantity 
     * @returns 
     */
    reduceStock(quantity) {
        if (this.#stock <= 0) {
            throw new Error("The Product stock is empty")
        }

        if (this.#stock < quantity) {
            throw new Error("The stock is not enough")
        }

        return this.#stock -= quantity
    }
}