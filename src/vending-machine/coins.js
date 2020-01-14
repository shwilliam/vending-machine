const COINS = [
  ['TWO_DOLLAR', 2],
  ['DOLLAR', 1],
  ['QUARTER', 0.25],
  ['DIME', 0.1],
  ['NICKEL', 0.05],
]

/**
 * Represents a coin stock
 * @constructor
 * @param {Object.<string, number>} coins - initial coin stock
 */
class Coins {
  constructor(coins) {
    this.coins = coins
    this.total = this.calculateTotal(coins)
  }

  /**
   * Set item stock
   * @param {Object.<string, number>} coins - new coin stock
   * @return {number} total - value of coins
   */
  set(coins) {
    this.coins = coins
    this.total = this.calculateTotal(coins)
    return this.total
  }

  /**
   * Get item stock
   * @return {Object.<string, number>} coins - coin stock
   */
  get() {
    return this.coins
  }

  /**
   * Get coin value
   * @param {string} coin - coin type
   * @return {number} value - coin value
   */
  getValue(coin) {
    return COINS.find(([coinName]) => coinName === coin)[1]
  }

  /**
   * Refill coin stock
   * @param {Object.<string, number>} coins - coin quantities
   * @return {number} total - updated coin stock value
   */
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

  /**
   * Find largest in stock coin
   * @param {number} amount - coin quantity
   * @param {Object.<string, number>} coins - coin quantities
   * @return {string} coin - coin type
   */
  findLargestCoin(amount, coins) {
    const largestCoin = COINS.find(([coin, value]) => {
      const inStock = coins[coin] > 0
      return inStock && amount - value >= 0
    })

    if (!largestCoin) throw new Error('COINS_OUT_OF_STOCK')
    return largestCoin[0]
  }

  /**
   * Process purchase coins
   * @param {number} amount - purchase value
   * @param {Object.<string, number>} coins - coin quantities
   * @return {Object.<string, number>} change - change coins quantities
   */
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

  /**
   * Calculate total value of coins
   * @param {Object.<string, number>} coins - coin quantities
   * @return {number} total - total coin value
   */
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
