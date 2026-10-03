import { Store } from './store.js'
import { Product } from './product.js'

const store1 = new Store('Banana chips')

const product1 = new Product('Banana chips', 10, 35)
const product2 = new Product('Apple', 15, 15)
const product3 = new Product('Avocado', 22, 10)
const product4 = new Product('Dragon seeds', 7, 25)
const product5 = new Product('Potato chips', 5, 15)

store1.addItemToCart(product1, 5)
store1.addItemToCart(product2, 5)
store1.addItemToCart(product3, 4)

// console.log(store1.info)

store1.displayCart()
store1.checkIfAlreadyInTheCart(product1)
// store1.isAlreadyInTheCart(product1)

