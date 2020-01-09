import VendingMachine from '../lib/vending-machine.js'

describe('VendingMachine', () => {
  describe('stock.get()', () => {
    it('returns empty array if stock empty', () => {
      expect(new VendingMachine().stock.get()).toEqual([])
    })
  })

  describe('stock.refill(valid quantity, valid index, no item obj)', () => {
    it('returns updated stock', () => {
      const machine = new VendingMachine([
        {name: 'WATER', quantity: 2, price: 10},
      ])
      const quantity = 4
      const index = 0
      const expectedItem = {name: 'WATER', quantity: 6, price: 10}

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
