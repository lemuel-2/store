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

        if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
            throw new Error("Invalid Product price")
        }

        if (typeof stock !== "number" || !Number.isFinite(stock) || stock < 0) {
            throw new Error("Invalid Product quantity")
        }

        this.#name = name.trim();
        this.#price = price;
        this.#stock = stock;
    }

    get name() { return this.#name }
    get price() { return this.#price }
    get stock() { return this.#stock }

    set stock(value) {
        if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
            throw new Error("Invalid Product quantity")
        }
        this.#stock = value
    }

    /**
     * return a string of information about
     * the product(name, price, stock)
     */
    get info() {
        return `item: ${this.#name}, price: ${this.#price}, stock: ${this.#stock}`
    }

    /**
     * Reduce the product quantity
     * if purchasing item
     * @param {number} quantity
     * @returns
     */
    reduceStock(quantity) {
        if (typeof quantity !== "number" || !Number.isFinite(quantity) || quantity <= 0) {
            throw new Error("Invalid quantity")
        }

        if (this.#stock <= 0) {
            throw new Error("The Product stock is empty")
        }

        if (this.#stock < quantity) {
            throw new Error("The stock is not enough")
        }

        this.#stock -= quantity
        return this.#stock
    }
}