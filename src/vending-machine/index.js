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
    const change = this.coins.purchase(item.price, coins)
    const updatedStock = this.stock.purchase(index)

    return [item.name, change, updatedStock]
  }
}

export default VendingMachine
