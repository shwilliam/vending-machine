import VendingMachine from '../lib/vending-machine/index.js'

describe('VendingMachine', () => {
  describe('.buy()', () => {
    describe('when called w valid params', () => {
      const machine = new VendingMachine(
        [{name: 'WATER', quantity: 2, price: 0.73}],
        {
          TWO_DOLLAR: 1,
          DOLLAR: 2,
          QUARTER: 1,
        },
      )
      const purchase = machine.buy(0, {TWO_DOLLAR: 1})

      it('returns purchased item name', () => {
        expect(purchase[0]).toEqual('WATER')
      })
      it('updates coins stock', () => {
        expect(machine.coins.get()).toEqual({
          DOLLAR: 1,
          TWO_DOLLAR: 2,
          QUARTER: 0,
        })
      })
      it('returns change in coins', () => {
        expect(purchase[1]).toEqual({DOLLAR: 1, QUARTER: 1})
      })
      it('updates stock', () => {
        expect(machine.stock.get()).toEqual([
          {name: 'WATER', quantity: 1, price: 0.73},
        ])
      })
      it('returns updated stock', () => {
        expect(purchase[2]).toEqual([
          {name: 'WATER', quantity: 1, price: 0.73},
        ])
      })
    })

    describe('when passed invalid index', () => {
      const machine = new VendingMachine(
        [{name: 'WATER', quantity: 2, price: 0.73}],
        {
          DOLLAR: 2,
          TWO_DOLLAR: 1,
          QUARTER: 1,
        },
      )

      it(`throws 'OUT_OF_STOCK' error`, () => {
        try {
          machine.buy(1, {QUARTER: 1})
        } catch (e) {
          expect(e.message).toEqual('OUT_OF_STOCK')
        }
      })
    })

    describe('when payment too low', () => {
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

    describe('when coin stock low', () => {
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

    describe('when item out of stock', () => {
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
  })

  describe('stock', () => {
    describe('.get()', () => {
      describe('when items stocked', () => {
        it('returns array of stocked items', () => {
          const stock = [
            {name: 'WATER', quantity: 2, price: 0.73},
            {name: 'BANANA', quantity: 0, price: 0.3},
          ]
          expect(new VendingMachine(stock).stock.get()).toEqual(stock)
        })
      })
      describe('when stock empty', () => {
        it('returns empty array if stock empty', () => {
          expect(new VendingMachine().stock.get()).toEqual([])
        })
      })
    })

    describe('.refill()', () => {
      describe('when stocking existing item', () => {
        it('returns updated stock', () => {
          const machine = new VendingMachine([
            {name: 'WATER', quantity: 2, price: 1},
          ])
          const quantity = 4
          const index = 0
          const expectedItem = {
            name: 'WATER',
            quantity: 6,
            price: 1,
          }

          const stock = machine.stock.refill(index, quantity)

          expect(stock[index]).toEqual(expectedItem)
        })
      })
      describe('when stocking new item', () => {
        it('returns updated stock', () => {
          const machine = new VendingMachine([
            {name: 'WATER', quantity: 2, price: 1},
          ])
          const quantity = 4
          const index = 3
          const newItem = {
            name: 'BANANA',
            price: 0.3,
          }

          const stock = machine.stock.refill(index, quantity, newItem)

          expect(stock[index]).toEqual({...newItem, quantity})
        })
      })
      describe('when stocking new item at existing item index', () => {
        it('replaces item', () => {
          const machine = new VendingMachine([
            {name: 'WATER', quantity: 0, price: 1},
          ])
          const quantity = 4
          const index = 0
          const newItem = {
            name: 'BANANA',
            price: 0.3,
          }

          const stock = machine.stock.refill(index, quantity, newItem)

          expect(stock[index]).toEqual({...newItem, quantity})
        })
      })
      describe('when restocking item with a new price', () => {
        it('updates item price', () => {
          const machine = new VendingMachine([
            {name: 'WATER', quantity: 2, price: 1},
          ])
          const quantity = 4
          const index = 0
          const itemUpdate = {
            price: 0.3,
          }

          const stock = machine.stock.refill(
            index,
            quantity,
            itemUpdate,
          )

          // TODO: DRY up tests
          expect(stock[index]).toEqual({
            name: 'WATER',
            quantity: 6,
            ...itemUpdate,
          })
        })
      })
    })
  })

  describe('coins', () => {
    describe('.get()', () => {
      describe('when coins in stock', () => {
        it('returns change', () => {
          const coins = {
            DOLLAR: 2,
            TWO_DOLLAR: 1,
          }
          const machine = new VendingMachine([], coins)

          expect(machine.coins.get()).toEqual(coins)
        })
      })
    })

    describe('.refill()', () => {
      describe('when passed valid coins obj', () => {
        it('returns updated total change', () => {
          const machine = new VendingMachine()
          const coins = {NICKEL: 4, DIME: 10}
          const expectedTotal = 1.2

          const updatedTotal = machine.coins.refill(coins)

          expect(updatedTotal).toEqual(expectedTotal)
        })
      })
    })
  })
})
