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
    return this.coins
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
    const largestCoin = COINS.find(([coin, value]) => {
      const inStock = coins[coin] > 0
      return inStock && amount - value >= 0
    })

    if (!largestCoin) throw new Error('COINS_OUT_OF_STOCK')
    return largestCoin[0]
  }

  purchase(amount, coins) {
    const coinsValue = this.calculateTotal(coins)
    const changeAmount = coinsValue - amount

    if (changeAmount < 0) throw new Error('LOW_PAYMENT')

    let remainingChange = changeAmount
    let coinStock = {...this.coins}

    // include purchase coins in coin stock
    coinStock = Object.keys(coins).reduce((acc, coin) => {
      if (acc[coin] && acc[coin] > 0) {
        return {...acc, [coin]: acc[coin] + coins[coin]}
      } else {
        return {...acc, [coin]: coins[coin]}
      }
    }, coinStock)

    const change = {}
    while (remainingChange > 0.03) {
      const nextCoin = this.findLargestCoin(
        remainingChange,
        coinStock,
      )

      // update coin stock copy
      coinStock[nextCoin] -= 1

      // update change obj
      if (change[nextCoin]) change[nextCoin]++
      else change[nextCoin] = 1

      remainingChange -= this.getValue(nextCoin)
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
