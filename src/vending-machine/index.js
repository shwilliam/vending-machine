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

    if (!item || item.quantity < 1) return 0

    const change = this.coins.purchase(item.price, coins)
    if (!change) return 0

    const updatedStock = this.stock.purchase(index)

    return [item.name, change, updatedStock]
  }
}

export default VendingMachine
