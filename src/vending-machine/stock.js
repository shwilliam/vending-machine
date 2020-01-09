class Stock {
  constructor(stock) {
    this.stock = stock
  }

  get() {
    return this.stock
  }

  refill(quantity, index, item) {
    // TODO: return updated stock
    const stockCopy = [...this.stock]

    if (this.stock[index]) {
      if (this.stock[index].quantity > 0) {
        stockCopy[index].quantity += quantity
      } else {
        stockCopy[index].quantity = quantity
      }
    }

    this.stock = stockCopy
    return this.get()
  }
}

export default Stock
