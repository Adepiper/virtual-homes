const main = document.getElementById('main'),
  addUser = document.getElementById('add-user'),
  double = document.getElementById('double'),
  sortBy = document.getElementById('sort'),
  showMillionare = document.getElementById('show-millionaire'),
  calculateWealth = document.getElementById('calculate-wealth');

let data = [];

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };
  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDom();
}

function updateDom(proviedData = data) {
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  proviedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return 'N' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      money: user.money * 2
    };
  });

  updateDom();
}

function sortByMoney() {
  data.sort((a, b) => {
    return b.money - a.money;
  });

  updateDom();
}

function filterMillionaires() {
  data = data.filter(item => {
    return item.money >= 1000000;
  });

  updateDom();
}

function addAllWealth() {
  const wealth = data.reduce((arr, user) => (arr += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
sortBy.addEventListener('click', sortByMoney);
showMillionare.addEventListener('click', filterMillionaires);
calculateWealth.addEventListener('click', addAllWealth);
