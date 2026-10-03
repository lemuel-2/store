import { Product } from './product.js'

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

export class Store {
    #name
    #items = []

    constructor(name) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Invalid Store name")
        }

        this.#name = name
    }

    /**
     * show the name of customer
     * show the list of order product
     * show the total bill
     */
    productOrder(customer) {
        const total = this.calculateTheTotalAmount()
        console.log(`${customer.name}`)
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
        if (!(product instanceof Product)) {
            throw new Error("Invalid Store Product")
        }
        
        if (typeof quantity !== 'number' || quantity <= 0) {
            throw new Error('Invalid quantity')
        }
        
        if (product.stock <= 0) {
            throw new Error(`${product.name} is currently not available`)
        }
        
        // if product is already in the cart
        if (this.checkIfAlreadyInTheCart(product, quantity)) {
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
        if (!(product instanceof Product)) {
            throw new Error("Invalid Store Product")
        }
                      
        const result = this.#items.find((p) => p.name === product.name)
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
        if (!(product instanceof Product)) {
           throw new Error("Invalid Store Product")
        }
                   
        const result = this.#items.find((i) => i.name === product.name)
        if (!result) {
            throw new Error(`No Product ${product.name} has been found`)
        }

        this.#items = this.#items.filter((i) => i.name !== product.name)
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

    // show the product information
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

    // multiply the product and the quantity
    #subtotal(product, quantity) {
        return product.price * quantity
    }

    checkIfAlreadyInTheCart(product) {        
        return this.#items.some((item) => item.name !== product.name)
    }

    /**
     * add item price from the cart
     * @returns total
     */
    calculateTheTotalAmount() {
        if (this.#items.length === 0) {
            throw new Error(`No item found in the cart`)
        }

        let total = 0;
        for (const item of this.#items) {
            total += item.info.subtotal
        }

        return total;
    }

    get itemCount() { return this.#items.length }
}
