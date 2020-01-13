import Stock from './stock'
import Coins from './coins'

class VendingMachine {
  constructor(stock = [], coins = {}) {
    this.stock = new Stock(stock)
    this.coins = new Coins(coins)
  }

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
