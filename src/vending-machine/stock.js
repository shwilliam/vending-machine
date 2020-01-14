/**
 * Represents item stock
 * @constructor
 * @param {Array.<{name: string, quantity: number, price: number}>} stock - initial item stock
 */
class Stock {
  constructor(stock) {
    this.stock = stock
  }

  /**
   * Get item stock
   * @return {Array.<{name: string, quantity: number, price: number}>} stock - item stock
   */
  get() {
    return this.stock
  }

  /**
   * Refill item
   * @param {number} index - item index
   * @param {number} quantity - item quantity
   * @param {object} item - item info
   * @return {Array.<{name: string, quantity: number, price: number}>} stock - item stock
   */
  refill(index, quantity, item) {
    const stockCopy = [...this.stock]

    if (item) {
      if (stockCopy[index]) {
        stockCopy[index] = {
          ...stockCopy[index],
          ...item,
          quantity: (stockCopy[index].quantity || 0) + quantity,
        }
      } else {
        stockCopy[index] = {...item, quantity}
      }
    } else if (this.stock[index]) {
      if (this.stock[index].quantity > 0) {
        stockCopy[index].quantity += quantity
      } else {
        stockCopy[index].quantity = quantity
      }
    }

    this.stock = stockCopy
    return this.get()
  }

  /**
   * Purchase vending machine item
   * @param {number} index - item index
   * @return {Array.<{name: string, quantity: number, price: number}>} stock - item stock
   */
  purchase(index) {
    const updatedStock = [...this.stock]

    if (!updatedStock[index] || updatedStock[index].quantity < 1)
      throw new Error('OUT_OF_STOCK')

    updatedStock[index].quantity -= 1
    this.stock = updatedStock
    return this.get()
  }
}

export default Stock
