const outputEl = document.querySelector('.output')
const lengthEl = document.querySelector('.length')
const uppercaseEl = document.querySelector('.uppercase')
const lowercaseEl = document.querySelector('.lowercase')
const numberEl = document.querySelector('.number')
const symbolEl = document.querySelector('.symbol')
const generateEl = document.querySelector('.btn-generate')
const copy = document.querySelector('.btn-copy');
const resetEl = document.querySelector('.btn-reset')

const randomChars = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

copy.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = outputEl.innerText;

  if (!password) { return; }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  showAlert('Password copied successfully!')
});

const showAlert = (message) => {
  const div = document.createElement('div')
  div.className = 'alert'
  div.appendChild(document.createTextNode(message))
  const container = document.querySelector('.container')
  const settings = document.querySelector('.settings')
  container.insertBefore(div, settings);

  setTimeout(() => document.querySelector('.alert').remove(), 3000)
}

generateEl.addEventListener('click', () => {
  const len = +lengthEl.value;
  const hasUpper = uppercaseEl.checked;
  const hasLower = lowercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolEl.checked;

  outputEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, len)
})

resetEl.addEventListener('click', () => {
  outputEl.innerText = ''
  lengthEl.value = 20
  uppercaseEl.checked = false
  lowercaseEl.checked = false
  numberEl.checked = false
  symbolEl.checked = false
})

function generatePassword(upper, lower, number, symbol, len) {
  let generatedPassword = '';
  const typesCount = upper + lower + number + symbol;
  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0])

  if (typesCount === 0) {
    return ''
  }

  for (let i = 0; i < len; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0]
      generatedPassword += randomChars[funcName]()
    })
  }

  const finalPassword = generatedPassword.slice(0, len)

  return finalPassword
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
