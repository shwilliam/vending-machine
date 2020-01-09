const COINS = [
  ['TWO_DOLLAR', 2],
  ['DOLLAR', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.1],
  ['NICKEL', 0.05],
]

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

  getValue(coin) {
    return COINS.find(([coinName]) => coinName === coin)[1]
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

  findLargestCoin(amount, coins) {
    return COINS.find(([coin, value]) => {
      const inStock = coins[coin] > 0
      return inStock && amount - value >= 0
    })
  }

  purchase(amount, coins) {
    const coinsValue = this.calculateTotal(coins)
    const changeAmount = coinsValue - amount

    if (changeAmount < 0) return 0

    let remainingChange = changeAmount
    let coinStock = {...this.coins}
    const change = {}
    while (remainingChange > 0.03) {
      const nextCoin = this.findLargestCoin(
        remainingChange,
        coinStock,
      )

      // update coin stock copy
      coinStock[nextCoin[0]] -= 1

      // update change obj
      if (change[nextCoin[0]]) change[nextCoin[0]]++
      else change[nextCoin[0]] = 1

      remainingChange -= this.getValue(nextCoin[0])
    }

    this.set(coinStock)
    return change
  }

  calculateTotal(coins) {
    // TODO: cache and return on shallow object compare
    return Object.keys(coins).reduce((total, coin) => {
      switch (coin) {
        case 'TWO_DOLLAR':
          return total + coins[coin] * 2
        case 'DOLLAR':
          return total + coins[coin] * 1
        case 'QUARTER':
          return total + coins[coin] * 0.25
        case 'DIME':
          return total + coins[coin] * 0.1
        case 'NICKEL':
          return total + coins[coin] * 0.05
        default:
          return total
      }
    }, 0)
  }
}

export default Coins
