import VendingMachine from '../lib/vending-machine/index.js'

describe('VendingMachine', () => {
  describe('buy(valid index, valid payment)', () => {
    const machine = new VendingMachine(
      [{name: 'WATER', quantity: 2, price: 0.73}],
      {
        DOLLAR: 2,
        TWO_DOLLAR: 1,
        QUARTER: 1,
      },
    )
    const purchase = machine.buy(0, {TWO_DOLLAR: 1})

    it('returns purchased item name', () => {
      expect(purchase[0]).toEqual('WATER')
    })
    it('returns change in coins', () => {
      expect(purchase[1]).toEqual({DOLLAR: 1, QUARTER: 1})
    })
    it('returns updated stock', () => {
      expect(purchase[2]).toEqual([
        {name: 'WATER', quantity: 1, price: 0.73},
      ])
    })
  })

  describe('stock.get()', () => {
    it('returns empty array if stock empty', () => {
      expect(new VendingMachine().stock.get()).toEqual([])
    })
  })

  describe('stock.refill(valid quantity, valid index, no item obj)', () => {
    it('returns updated stock', () => {
      const machine = new VendingMachine([
        {name: 'WATER', quantity: 2, price: 1},
      ])
      const quantity = 4
      const index = 0
      const expectedItem = {name: 'WATER', quantity: 6, price: 1}

      const stock = machine.stock.refill(quantity, index)

      expect(stock[index]).toEqual(expectedItem)
    })
  })

  describe('coins.get()', () => {
    it('returns total change', () => {
      const machine = new VendingMachine([], {
        DOLLAR: 2,
        TWO_DOLLAR: 1,
      })
      const expectedTotal = 4

      const total = machine.coins.get()

      expect(total).toEqual(expectedTotal)
    })
  })

  describe('coins.refill(valid refill obj)', () => {
    it('returns updated total change', () => {
      const machine = new VendingMachine()
      const coins = {NICKEL: 4, DIME: 10}
      const expectedTotal = 1.2

      const updatedTotal = machine.coins.refill(coins)

      expect(updatedTotal).toEqual(expectedTotal)
    })
  })
})
