import { Cart } from './cart.js'
import { Product } from './product.js'
import { Customer } from './customer.js'
import { Store } from './store.js'
import { Inventory } from './inventory.js'

const inventory1 = new Inventory()
const store1 = new Store("Lemuel Sari sari Store", inventory1)


const cart1 = new Cart("cart 1", inventory1)
const cart2 = new Cart("cart 2", inventory1)
const cart3 = new Cart("cart 3", inventory1)

const customer1 = new Customer('Jerome')
const customer2 = new Customer('Lemuel')

const product1 = new Product('Banana chips', 10, 35)
const product2 = new Product('Apple', 15, 15)
const product3 = new Product('Avocado', 22, 10)
const product4 = new Product('Dragon seeds', 7, 25)
const product5 = new Product('Potato chips', 5, 15)
const product6 = new Product('Apple pie', 70, 5)

inventory1.addItemToInventory(product1)
inventory1.addItemToInventory(product2)
inventory1.addItemToInventory(product3)
inventory1.addItemToInventory(product4)
inventory1.addItemToInventory(product5)
inventory1.addItemToInventory(product6)

cart1.addItemToCart(product1, 5)
cart1.addItemToCart(product6, 5)
cart1.addItemToCart(product3, 4)
cart1.addItemToCart(product2, 7)
cart1.addItemToCart(product4, 7)
cart1.addItemToCart(product5, 4)

cart2.addItemToCart(product3, 3)
cart2.addItemToCart(product5, 1)
cart2.addItemToCart(product2, 1)

cart3.addItemToCart(product2, 1)

// display area
store1.displayReceipt(cart1, customer1)
store1.displayReceipt(cart2, customer2)
store1.displayReceipt(cart3, customer1)
store1.displayInventory()

inventory1.displayInventory()