// Import ID, text, amount, list, balance, money_plus, money_minus, form from DOM
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const dropDown = document.getElementById('dropdown');

// Create a transaction array
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// Check whether value to be used is null
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];


// Get which item was selected from the dropdown
const dropdownValue = dropDown.value;
console.log(dropdownValue);

// Genete Random ID using Math.random
function generateID() {
    return Math.floor(Math.random() * 1000000000);
}


// Add transactions
function addTransaction(e) {
    e.preventDefault();

    // Throw an error message if text or amount is empty
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('please add text and amount')
    } else {

        //Create a new transaction object
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: amount.value,
            category: dropdownValue
        }

        // Add transaction to transaction array
        transactions.push(transaction);

        // Add transaction to DOM list
        addTransactionDOM(transaction);

        // Update the balance, income and expense
        updateValues();
        updateLocalStorage();

        // Clear the input fields
        text.value = '';
        amount.value = '';
    }
    // Init function
    init();

}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    const item = document.createElement('li');

    // Add Class Based on selected category
    item.classList.add(transaction.category === 'income' ? "income" : "expense");

    // Add Transaction HTML 
    item.innerHTML = `${transaction.text} <span>${transaction.amount}</span>`;
    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Calculate income if selected category is income then add to income
    const income = amounts.filter((item) => item.transaction.category === 'income').reduce((acc, item) => (acc += item), 0).toFixed(2);

    // Calculate expense if selected category is expense then add to expense
    const expense = (amounts.filter(item => dropdownValue === 'expense').reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    // Update balance in DOM
    balance.innerText = `$${total}`;

    // Update income in DOM
    money_plus.innerText = `$${income}`;

    // Update expense in DOM
    money_minus.innerText = `$${expense}`;
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add event listener for form submit
form.addEventListener('submit', addTransaction);

// Intilliase the app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
    updateLocalStorage();
}

// Call init function
init();