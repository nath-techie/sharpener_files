document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expenseList');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('expenseName').value;
        const amount = document.getElementById('expenseAmount').value;
        const description = document.getElementById('expenseDescription').value;
        const editIndex = document.getElementById('editIndex').value;

        const expense = { name, amount, description };

        if (editIndex === '') {
            expenses.push(expense);
        } else {
            expenses[editIndex] = expense;
        }

        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
        expenseForm.reset();
        document.getElementById('editIndex').value = '';
    });

    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const item = document.createElement('li');
            item.classList.add('list-group-item');
            item.innerHTML = `
                ${expense.name}: Rs.${expense.amount}
                <br>Description: ${expense.description}
                <button onclick="deleteExpense(${index})" class="btn btn-danger btn-sm float-right">Delete</button>
                <button onclick="editExpense(${index})" class="btn btn-warning btn-sm float-right mr-2">Edit</button>
            `;
            expenseList.appendChild(item);
        });
    }

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    };

    window.editExpense = (index) => {
        document.getElementById('expenseName').value = expenses[index].name;
        document.getElementById('expenseAmount').value = expenses[index].amount;
        document.getElementById('expenseDescription').value = expenses[index].description;
        document.getElementById('editIndex').value = index;
    };

    displayExpenses();
});
 