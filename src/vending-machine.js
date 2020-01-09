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
    // TODO: return total value of coins
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
