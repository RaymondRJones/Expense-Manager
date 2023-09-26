import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import ExpensesDialog from './ExpenseDialog';

const Expense = ({ category, description, cost, onEdit, onDelete }) => (
  <>
    <TableCell>{category}</TableCell>
    <TableCell>{description}</TableCell>
    <TableCell>{cost.toFixed(2)}</TableCell>
    <TableCell>
      <Button onClick={onEdit}>Edit</Button>
      <Button onClick={onDelete}>Delete</Button>
    </TableCell>
  </>
);

const ExpenseTable = ({ expenses, users, onAddExpense, onDeleteExpense, onUpdateExpense }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleAddExpense = (newExpense) => {
        const currentUnixTime = Math.floor(Date.now() / 1000);

        const updatedExpense = {
            ...newExpense,
            time_created_at: currentUnixTime
        };
        onAddExpense(updatedExpense)
        setDialogOpen(false);
    };

    const handleUpdateExpense = (updatedExpense) => {
        const expenseIndex = expenses.findIndex(
            (expense) => expense.time_created_at === updatedExpense.time_created_at
        );
        if (expenseIndex !== -1) {

            const updatedExpenses = [...expenses];
            updatedExpenses[expenseIndex] = updatedExpense;
        
            onUpdateExpense(updatedExpense)
        }
        setDialogOpen(false);
    };
    

    const handleDeleteExpense = (expenseTimeCreatedAt) => {
        const updatedExpenses = expenses.filter(
            (expense) => expense.time_created_at !== expenseTimeCreatedAt
        );

        onDeleteExpense(expenseTimeCreatedAt)
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
