import Stock from './stock'
import Coins from './coins'

/**
 * Represents a vending machine
 * @constructor
 * @param {Array.<{name: string, quantity: number, price: number}>} stock - initial item stock
 * @param {Object.<string, number>} coins - initial coin stock
 */
class VendingMachine {
  constructor(stock = [], coins = {}) {
    this.stock = new Stock(stock)
    this.coins = new Coins(coins)
  }

  /**
   * Purchase vending machine item
   * @param {number} index - item index
   * @param {Object.<string, number>} coins - change for purchase
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
