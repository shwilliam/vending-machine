class Coins {
  constructor(coins) {
    this.coins = coins
    this.total = this.calculateTotal(coins)
  }

  set(coins) {
    this.coins = coins
    this.total = this.calculateTotal(coins)
    return this.total
  }

  get() {
    return this.total
  }

  refill(coins) {
    this.set(
      Object.keys(coins).reduce((acc, coin) => {
        if (acc[coin] && acc[coin] > 0) {
          return (acc[coin] = acc[coin] + coins[coin])
        } else {
          return {...acc, [coin]: coins[coin]}
        }
      }, this.coins),
    )
    return this.total
  }

  calculateTotal() {
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
}

export default Coins
