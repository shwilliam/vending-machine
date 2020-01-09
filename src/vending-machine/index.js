import Stock from './stock'
import Coins from './coins'

class VendingMachine {
  constructor(stock = [], coins = {}) {
    this.stock = new Stock(stock)
    this.coins = new Coins(coins)
  }
}

export default VendingMachine
