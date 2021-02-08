const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const currencyTwo = document.getElementById('currency-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currency_one = currencyOne.value;
  const currency_two = currencyTwo.value;

  fetch(
    ` https://prime.exchangerate-api.com/v5/14d26332d028b8a2e8addfdb/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rates[currency_two];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountTwo.value = (amountOne.value * rate).toFixed(2);
    });
}

swap.addEventListener('click', () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
});

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
