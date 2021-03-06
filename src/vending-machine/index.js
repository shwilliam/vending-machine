import Stock from './stock'
import Coins from './coins'

/**
 * Represents a vending machine
 * @constructor
 * @param {Array.<{name: string, quantity: number, price: number}>} stock - initial item stock
 * @param {Object} coins - initial coin quantities
 */
class VendingMachine {
  constructor(stock = [], coins = {}) {
    this.stock = new Stock(stock)
    this.coins = new Coins(coins)
  }

  /**
   * Purchase vending machine item
   * @param {number} index - item index
   * @param {Object} coins - change for purchase
   * @return {Array.<{name: string, change: {Object}, stock: Array.<{name: string, quantity: number, price: number}>}>} purchase info - array of purchase information
   */
  buy(index, coins) {
    const stock = this.stock.get()
    const item = stock && stock[index]
    // TODO: check stock and throw e before updating inventory
    const updatedStock = this.stock.purchase(index)
    const change = this.coins.purchase(item.price, coins)

    return [item.name, change, updatedStock]
  }
}

export default VendingMachine
