const inputField = document.querySelector('#currencyInput');
const currentCurrency = document.querySelector('#currentCurrency');
const exchangedCurrency = document.querySelector('#exchangedCurrency');
const button = document.querySelector('#exchangeButton');
const changebutton = document.querySelector('#switch');
const resultContainer = document.querySelector('.result-container');

function switchCurrency() {
  const value = currentCurrency.value;
  const optionSelect = currentCurrency.querySelectorAll('option');
  optionSelect.forEach((value)=>{
    value.selected = false;
  });
  currentCurrency.querySelector('option[value='+exchangedCurrency.value +"]").selected = true;

  const value2 = exchangedCurrency.querySelectorAll('option');
  value2.forEach((value)=>{
    value.selected = false;
  });
  exchangedCurrency.querySelector('option[value='+value+"]").selected = true;
}
function exchangeRequest() {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', function (event) {
    const response = event.target;
    if (response.readyState === 4) {
      if (response.status >= 200 && response.status < 300) {
          const responseText = JSON.parse(response.responseText);
          showExchange(responseText.rates[exchangedCurrency.value]);
      }
    }
  });
  request.open('GET', 'https://api.exchangeratesapi.io/latest/?base='+currentCurrency.value);
  request.send();
}
function showExchange(response) {
  if (currentCurrency.value === exchangedCurrency.value) {
    resultContainer.textContent = inputField.value;
  } else {
    const product = Math.round((inputField.value * response)*100)/100;
    resultContainer.textContent = product;
  }
}
button.addEventListener('click', exchangeRequest);
changebutton.addEventListener('click', switchCurrency);
