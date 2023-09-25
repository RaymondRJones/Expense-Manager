import React, { useState } from 'react';
const ExpenseTable = ({ expenses: initialExpenses }) => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses(prevExpenses => [...prevExpenses, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };
  const showExpenseInputs = () => {
    setExpenses(prevExpenses => [...prevExpenses, null]);
  };
  return (
    <div className="expense-table">
      <button onClick={showExpenseInputs}>Add</button>
      <button onClick={showExpenseInputs}>Edit</button>
      <button onClick={handleDeleteExpense(0)}>Delete</button>
    </div>
  );
}

export default ExpenseTable;
