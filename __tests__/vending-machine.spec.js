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

  describe('buy(valid index, valid payment too low)', () => {
    const machine = new VendingMachine(
      [{name: 'WATER', quantity: 2, price: 0.73}],
      {
        DOLLAR: 2,
        TWO_DOLLAR: 1,
        QUARTER: 1,
      },
    )

    it(`throws 'LOW_PAYMENT' error`, () => {
      try {
        machine.buy(0, {QUARTER: 1})
      } catch (e) {
        expect(e.message).toEqual('LOW_PAYMENT')
      }
    })
  })

  describe('buy(valid index, valid payment stock low)', () => {
    const machine = new VendingMachine(
      [{name: 'BANANA', quantity: 2, price: 0.3}],
      {
        TWO_DOLLAR: 1,
        DOLLAR: 2,
      },
    )

    it(`throws 'COINS_OUT_OF_STOCK' error`, () => {
      try {
        machine.buy(0, {QUARTER: 2})
      } catch (e) {
        expect(e.message).toEqual('COINS_OUT_OF_STOCK')
      }
    })
  })

  describe('buy(valid index out of stock, valid payment)', () => {
    const machine = new VendingMachine(
      [
        {name: 'WATER', quantity: 2, price: 0.73},
        {name: 'BANANA', quantity: 0, price: 0.3},
      ],
      {
        DOLLAR: 2,
        TWO_DOLLAR: 1,
        QUARTER: 1,
      },
    )

    it(`throws 'OUT_OF_STOCK' error`, () => {
      try {
        machine.buy(1, {DOLLAR: 1})
      } catch (e) {
        expect(e.message).toEqual('OUT_OF_STOCK')
      }
    })
  })

  describe('stock.get()', () => {
    it('returns array of stocked items', () => {
      const stock = [
        {name: 'WATER', quantity: 2, price: 0.73},
        {name: 'BANANA', quantity: 0, price: 0.3},
      ]
      expect(new VendingMachine(stock).stock.get()).toEqual(stock)
    })
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
    it('returns change', () => {
      const coins = {
        DOLLAR: 2,
        TWO_DOLLAR: 1,
      }
      const machine = new VendingMachine([], coins)

      expect(machine.coins.get()).toEqual(coins)
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
