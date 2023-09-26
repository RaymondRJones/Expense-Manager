import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import ExpensesDialog from './ExpenseDialog';

const Expense = ({ category, description, cost, onEdit, onDelete }) => (
  <React.Fragment>
    <TableCell>{category}</TableCell>
    <TableCell>{description}</TableCell>
    <TableCell>{cost.toFixed(2)}</TableCell>
    <TableCell>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </TableCell>
  </React.Fragment>
);

const ExpenseTable = ({ expenses: initialExpenses, users, onAddExpense }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [expenses, setExpenses] = useState(initialExpenses);

    const handleAddExpense = (newExpense) => {
        // Get current Unix timestamp
        const currentUnixTime = Math.floor(Date.now() / 1000);

        const updatedExpense = {
            ...newExpense,
            time_created_at: currentUnixTime
        };
        setExpenses([...expenses, updatedExpense]);
        onAddExpense(updatedExpense);
        setDialogOpen(false);
    };

    const handleUpdateExpense = (updatedExpense) => {
        const expenseIndex = expenses.findIndex(
            (expense) => expense.user_time_created === updatedExpense.user_time_created
        );
        if (expenseIndex !== -1) {

            const updatedExpenses = [...expenses];
            updatedExpenses[expenseIndex] = updatedExpense;
        
            setExpenses(updatedExpenses);
        }
        setDialogOpen(false);
    };
    

    const handleDeleteExpense = (expenseId) => {

        const updatedExpenses = expenses.filter(
            (expense) => expense.user_time_created !== expenseId
        );

        setExpenses(updatedExpenses);
    };

    const handleEditClick = (expense) => {
        setSelectedExpense(expense);
        setDialogOpen(true);
    };

    return (
        <Paper className="expense-table">
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Actions</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {expenses.map(expense => (
                <TableRow key={expense.time_created_at}>
                <Expense
                    {...expense}
                    onEdit={() => handleEditClick(expense)}
                    onDelete={() => handleDeleteExpense(expense.time_created_at)}
                />
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Button variant="contained" color="primary" onClick={() => { setSelectedExpense(null); setDialogOpen(true); }}>Add Expense</Button>
            
        <ExpensesDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onSave={selectedExpense ? handleUpdateExpense : handleAddExpense}
            expense={selectedExpense || null}
            users={users}
        />
        </Paper>
    );
}

export default ExpenseTable;
