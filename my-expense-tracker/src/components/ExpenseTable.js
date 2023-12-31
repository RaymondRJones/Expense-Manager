import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import ExpensesDialog from './ExpenseDialog';
import { v4 as uuidv4 } from 'uuid';
const Expense = ({ category, description, cost, onEdit, onDelete }) => (
  <>
    <TableCell>{category}</TableCell>
    <TableCell>{description}</TableCell>
    <TableCell>${cost.toFixed(2)}</TableCell>
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
        const updatedExpense = {
            ...newExpense,
            id: uuidv4()
        };
        onAddExpense(updatedExpense)
        setDialogOpen(false);
    };

    const handleUpdateExpense = (updatedExpense) => {
        const expenseIndex = expenses.findIndex(
            (expense) => expense.id === updatedExpense.id
        );
        // Check if index exists before setting
        if (expenseIndex !== -1) {  // Could turn this into a function like isValidIndex(expenseIndex)
            const updatedExpenses = [...expenses];
            updatedExpenses[expenseIndex] = updatedExpense;
        
            onUpdateExpense(updatedExpense)
        }
        setDialogOpen(false);
    };
    

    const handleDeleteExpense = (expenseId) => {
        onDeleteExpense(expenseId)
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
                <TableRow key={expense.id}>
                <Expense
                    {...expense}
                    onEdit={() => handleEditClick(expense)}
                    onDelete={() => handleDeleteExpense(expense.id)}
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
