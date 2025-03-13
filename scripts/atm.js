


class user {
    constructor(firstName, lastName, email, password, balance = 0.0) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.transactions = [];

    }

    addTransaction(type, amount) {
        this.transactions.push({type, amount});
        updateTransactionHistory(type, amount);
    }
}

const users = [
    new user("jake", "egbert", "j.com", "1234", 10000),
    new user("tytan", "telford", "t.com", "1234", 10000),
    new user("leland", "lobato", "l.com", "1234", 10000),
    new user("aidan", "jex", "a.com", "1234", 10000),
    new user("enoka", "enoka", "e.com", "1234", 10000),

];

let loggedInUser = null

function toggleVisibility(elementId, shouldShow) {
    document.getElementById(elementId).classList.toggle("hidden", !shouldShow)
}

function updateTextContent(elementId, text) {
    document.getElementById(elementId).textContent = text
}

function showBalance() {
    if (loggedInUser) {
        updateTextContent(
            "balance-display", 
            `Your Balance Is $${loggedInUser.balance.toFixed(2)}`
        )
    };
}

function toggleTransation(type) {
    toggleVisibility("deposit-section", type == "deposit");
    toggleVisibility("withdraw-section", type == "withdraw");
}

function completeTransaction(type) {
    const amount = parseFloat(document.getElementById(`${type}-amount`).value);
    const errorId = `${type}-error`;
    const errorCondition = 
        isNaN(amount) || 
        amount <= 0 || 
        (type == "withdraw" && amount > loggedInUser.balance);

    if (errorCondition) {
        toggleVisibility(errorId, true)
    } else {
        loggedInUser.balance += type === "deposit" ? amount : -amount;
        loggedInUser.addTransaction(
            type === "deposit" ? "deposit" : "withdraw",
        amount
    );
        showBalance();
        toggleVisibility(`${type}-section`, false);
    }
}

function updateTransactionHistory(type, amount) {
    const trasactionList = document.getElementById("transaction-list")
    const transactionItem = document.createElement("li")

    transactionItem.classList.add(type === "deposit" ? "deposit" : "withdraw")
    transactionItem.textContent = `$${type}: $${amount.toFixed(2)}`;
    trasactionList.appendChild(transactionItem);
}

function Login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 

    const user = users.find((user) => user.email === email && user.password === password)

    if (user) {
        loggedInUser = user
        toggleVisibility("login-section", false)
        toggleVisibility("atm-menu", true)
        toggleVisibility("transaction-history", true)
    } else {
        toggleVisibility("login-error", true);
    }
}

function logout() {
    ["atm-menu", "transaction-history"].forEach((id) => {
        toggleVisibility(id, false)
    });
    document.getElementById("transaction-list".innerHTML = "");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    loggedInUser = null;
    toggleVisibility("login-section", true)
}