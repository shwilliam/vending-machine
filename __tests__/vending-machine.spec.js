const VendingMachine = require('../lib/vending-machine.js')

describe('VendingMachine', () => {
  describe('getStock()', () => {
    it('returns 0 if no stock empty', () => {
      const testMachine = new VendingMachine({})
      const result = testMachine.getStock()
      expect(result).toEqual(0)
    })
  })
})
