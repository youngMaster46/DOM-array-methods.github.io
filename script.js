const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

function addData(obj) {
    data.push(obj)

    updateDOM()
}

// Update DOM
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'
    providedData.forEach((el) => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${el.name}</strong> ${formatMoney(el.money)}`;
        main.appendChild(element)
    })
}

// Double money for everyone
function doubleMoney() {
    data = data.map((el) => {
        return {
            ...el,
            money: el.money * 2
        }
    })
    updateDOM()
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money;
    })
    updateDOM()
}

// Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)

getRandomUser()
getRandomUser()
getRandomUser()