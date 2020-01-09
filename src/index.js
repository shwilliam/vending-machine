import VendingMachine from './vending-machine/index.js'

const machine = new VendingMachine(
  [{name: 'WATER', quantity: 2, price: 0.73}],
  {
    DOLLAR: 2,
    TWO_DOLLAR: 1,
    QUARTER: 1,
  },
)

const infoStock = document.getElementById('info-stock')
const infoCoins = document.getElementById('info-coins')
const formPurchase = document.getElementById('form-purchase')
const inputPurchaseIndex = document.getElementById('input-index')

const render = () => {
  infoStock.innerText = JSON.stringify(machine.stock.get())
  infoCoins.innerText = JSON.stringify(machine.coins.get())
}

formPurchase.addEventListener('submit', e => {
  e.preventDefault()
  machine.buy(inputPurchaseIndex.value, {TWO_DOLLAR: 1})
  render()
})

render()
