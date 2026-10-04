import { Product } from './product.js'

/**
 * store the product in inventory
 */
export class Inventory {
    #list;

    constructor() {
        this.#list = []
    }

    /**
     * Add item in the inventory
     * @param {Product} product
     * @returns
     */
    addItemToInventory(product) {
        if (!(product instanceof Product)) {
            throw new Error("Invalid product")
        }

        if (this.#list.some((item) => item.name === product.name)) {
            throw new Error(`${product.name} is already in the inventory`)
        }

        this.#list.push(product)
        return this.#list
    }

    /**
     * Remove some item in the Inventory
     * @param {Product} product
     * @returns
     */
    removeItemFromTheInventory(product) {
        if (!(product instanceof Product)) {
            throw new Error("Invalid product")
        }

        const result = this.#list.find((item) => item.name === product.name)
        if (!result) {
            throw new Error(`No product ${product.name} has been found`)
        }

        this.#list = this.#list.filter((item) => item.name !== product.name)
        return this.#list
    }

    /**
     * find the item by its name
     * @param {string|Product} name
     * @returns
     */
    findProduct(name) {
        const productName = typeof name === "string" ? name : name?.name

        if (typeof productName !== "string" || productName.trim() === "") {
            throw new Error("Enter a valid name")
        }

        const result = this.#list.find((item) => item.name === productName)
        if (!result) {
            throw new Error(`No product ${productName} has been found`)
        }

        return result
    }

    /**
     * Changes the item stock
     * @param {Product} product
     * @param {number} stock
     * @returns
     */
    updateStock(product, stock) {
        if (!(product instanceof Product)) {
            throw new Error(`Invalid product`)
        }

        if (typeof stock !== "number" || !Number.isFinite(stock) || stock < 0) {
            throw new Error(`stock should not be negative`)
        }

        const result = this.findProduct(product.name)
        result.stock = stock

        return result
    }

    /**
     * display the list of item
     * inside the inventory
     */
    displayInventory() {
        if (this.#list.length === 0) {
            throw new Error(`No item found`)
        }

        for (let i = 0; i < this.#list.length; i++) {
            const item = this.#list[i]
            console.log(`item: ${item.name}, quantity: ${item.stock}, price: ${item.price}`)
        }
    }

    /**
     * the item by quantity
     */
    sortListByQuantity() {
        this.#list.sort((a, b) => a.stock - b.stock)
        return this.#list
    }

    get itemCount() {
        return this.#list.length
    }

    get items() {
        return [...this.#list]
    }
}