import VendingMachine from './vending-machine/index.js'

const machine = new VendingMachine(
  [
    {name: 'WATER', quantity: 4, price: 0.73},
    {name: 'BANANA', quantity: 20, price: 0.5},
    {name: 'MARS_BAR', quantity: 10, price: 2},
  ],
  {
    TWO_DOLLAR: 99,
    DOLLAR: 99,
    QUARTER: 99,
    DIME: 99,
    NICKEL: 99,
  },
)

const vendingMachineGrid = document.getElementById(
  'vending-machine-grid',
)
const infoError = document.getElementById('info-error')
const infoCoins = document.getElementById('info-coins')
const formPurchase = document.getElementById('form-purchase')
const inputTwoDollars = document.getElementById('input-two-dollars')
const inputDollars = document.getElementById('input-dollars')
const inputQuarters = document.getElementById('input-quarters')
const inputDime = document.getElementById('input-dimes')
const inputNickels = document.getElementById('input-nickels')

const makeVendingMachineItem = (i, name, price, quantity) => {
  const itemListItemContainer = document.createElement('li')
  itemListItemContainer.classList.add('vending-machine__item')
  const itemContainer = document.createElement('label')
  const itemNumber = document.createElement('p')
  itemNumber.classList.add('vending-machine__item-number')
  itemNumber.innerText = `#${i}`
  const itemName = document.createElement('p')
  itemName.classList.add('vending-machine__item-name')
  itemName.innerText = `${name} [${quantity || 'SOLD OUT'}]`
  const itemPrice = document.createElement('p')
  itemPrice.classList.add('vending-machine__item-price')
  // TODO: format price
  itemPrice.innerText = `$${price}`
  const itemRadioInput = document.createElement('input')
  itemRadioInput.type = 'radio'
  itemRadioInput.name = 'input-index'
  itemRadioInput.value = i
  if (quantity < 1) itemRadioInput.disabled = true
  if (i === 0) itemRadioInput.checked = true

  itemContainer.appendChild(itemNumber)
  itemContainer.appendChild(itemName)
  itemContainer.appendChild(itemPrice)
  itemContainer.appendChild(itemRadioInput)
  itemListItemContainer.appendChild(itemContainer)
  return itemListItemContainer
}

const render = () => {
  const stock = machine.stock.get()

  infoCoins.innerText = JSON.stringify(machine.coins.get())

  vendingMachineGrid.innerHTML = ''
  if (stock && stock.length)
    stock.forEach(({name, price, quantity}, i) => {
      vendingMachineGrid.appendChild(
        makeVendingMachineItem(i, name, price, quantity),
      )
    })
}

const renderError = message => (infoError.innerText = message)

formPurchase.addEventListener('submit', e => {
  e.preventDefault()
  try {
    machine.buy(
      vendingMachineGrid.querySelectorAll(':checked')[0].value,
      {
        TWO_DOLLAR: Number(inputTwoDollars.value),
        DOLLAR: Number(inputDollars.value),
        QUARTER: Number(inputQuarters.value),
        DIME: Number(inputDime.value),
        NICKEL: Number(inputNickels.value),
      },
    )
  } catch (e) {
    renderError(e.message)
  }
  render()
})

render()
