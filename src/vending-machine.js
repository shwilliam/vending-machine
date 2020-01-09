class VendingMachineStock {
  constructor(stock) {
    this.stock = stock
  }

  get() {
    return this.stock
  }

  refill(index, title, quantity) {
    // TODO: return updated stock
  }
}

class VendingMachineCoins {
  constructor(coins) {
    this.coins = coins
  }

  get() {
    // TODO: cache and return on shallow object compare
    return Object.keys(this.coins).reduce((total, coin) => {
      switch (coin) {
        case 'TWO_DOLLAR':
          return total + this.coins[coin] * 2
        case 'DOLLAR':
          return total + this.coins[coin] * 1
        case 'QUARTER':
          return total + this.coins[coin] * 0.25
        case 'DIME':
          return total + this.coins[coin] * 0.1
        case 'NICKEL':
          return total + this.coins[coin] * 0.05
        default:
          return total
      }
    }, 0)
  }

  refill(coins) {
    // TODO: return updated total value
  }
}

class VendingMachine {
  constructor(stock = [], coins = {}) {
    this.stock = new VendingMachineStock(stock)
    this.coins = new VendingMachineCoins(coins)
  }
}

export default VendingMachine
