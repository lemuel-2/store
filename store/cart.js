import { Product } from './product.js'
import { Customer} from './customer.js'
import { Inventory } from './inventory.js';

/**
 * Store name
 * can see the list of the item order
 * see the total amount of the order
 * see product information
 * 
 * Can use crud in the store
 * 1 add to cart
 * 2 display cart
 * 3 make changes in the cart (Update)
 * 4 delete some item in the cart
 */

export class Cart {
    #name;
    #inventory;
    #items = [];
    
    /**
     * @param {string} name 
     * @param {Inventory} inventory 
     */
    constructor(name, inventory) {
        // check if name is valid
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid Store name")
        }

        // check inventory is using class Inventory
        if (!(inventory instanceof Inventory)) {
            throw new Error("Invalid Inventory")
        }

        this.#inventory = inventory
        this.#name = name
    }

    /**
     * show the name of customer
     * show the list of order product
     * show the total bill
     * @param {Customer} customer 
     */
    productOrder(customer) {
        const total = this.calculateTheTotalAmount()
        console.log(`Customer name: ${customer.name}\n`)
        this.displayCart()
        console.log(`Total: ${total}`)

    }

    /**
     * Purchase a product from the store
     * store the purchase product to the items []
     * reduce the stock of the product
     * @param {object} product 
     * @param {number} quantity 
     * @returns 
     */
    addItemToCart(product, quantity) {
        // check if product is valid
        if (!(product instanceof Product)) {
            throw new Error("Invalid Store Product")
        }
        
        // check if quantity is valid
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Invalid quantity')
        }
        
        // check if the quantity is not zero or negative
        if (product.stock <= 0) {
            throw new Error(`${product.name} is currently not available`)
        }
        
        // if product is already in the cart
        if (this.checkIfAlreadyInTheCart(product)) {
            throw new Error(`${product.name} is already in the cart`)
        }
        
        const total = this.#subtotal(product, quantity)
        this.#items.push({ 
            name: product.name, 
            info: { 
                price: product.price,
                quantity: quantity,
                subtotal: total,
            }})

        
        return product.reduceStock(quantity)
    }
        
    /**
     * Update the product quantity
     * @param {Product} product 
     * @param {number} quantity 
     */
    updateItemInCart(product, quantity) {
        // check if product is from class Product
        if (!(product instanceof Product)) {
            throw new Error("Invalid Store Product")
        }
        
        // find the item by name
        const result = this.#items.find((p) => p.name === product.name)
        // check if the result is not empty
        if (!result) {
            throw new Error(`No Product ${product.name} has been found`)
        }

        result.info.quantity = quantity;
        result.info.subtotal = this.#subtotal(product, quantity)
        return result
    }
    
    /**
     * delete the product by name
     * @param {Product} product 
     * @returns 
    */
    deleteItemInCart(product) {
        // check if the product is from class Product
        if (!(product instanceof Product)) {
           throw new Error("Invalid Store Product")
        }
        
        // find the item by name
        const result = this.#items.find((item) => item.name === product.name)
        // check if the result is not empty
        if (!result) {
            throw new Error(`No Product ${product.name} has been found`)
        }

        this.#items = this.#items.filter((item) => item.name !== product.name)
        return this.#items
    }

    /**
     * display the item information
     */
    displayCart() {
        if (this.#items.length === 0) {
            throw new Error("The cart is empty")
        }
        
        for (let { name, info } of this.#items) {
            console.log(`product: ${name}`)
            console.log(`price: ${info.price}`)
            console.log(`quantity: ${info.quantity}`)
            console.log(`subtotal: ${info.subtotal}\n`)
        }
    }

    /**
     * return product information containing
     * name, price, and stock
     * @param {Product} product 
     * @returns object
     */
    showProductInfo(product) {
        if (!(product instanceof Product)) {
            throw new Error(`Invalid Store Product`)
        }

        return {
            name: product.name,
            price: product.price,
            stock: product.stock,
        }
    }

    /**
     * multiply product.price and quantity
     * @param {Product} product 
     * @param {number} quantity 
     * @returns 
     */
    #subtotal(product, quantity) {
        return product.price * quantity
    }

    /**
     * check if the product already exist
     * @param {Product} product 
     * @returns 
     */
    checkIfAlreadyInTheCart(product) {        
        return this.#items.some((item) => item.name === product.name)
    }

    /**
     * add item price from the cart
     * @returns total
     */
    calculateTheTotalAmount() {
        // check if cart is not empty
        if (this.#items.length === 0) {
            throw new Error(`No item found in the cart`)
        }

        // add all subtotal from the item
        let total = 0;
        for (const item of this.#items) {
            total += item.info.subtotal
        }

        return total;
    }

    get itemCount() { return this.#items.length }
    get cartInventory() { return this.#items}
}
