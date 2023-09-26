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

const ExpenseTable = ({ expenses, users, onAddExpense }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    const handleAddExpense = (newExpense) => {

    };

    const handleUpdateExpense = (updatedExpense) => {
        
    };

    const handleDeleteExpense = (expenseId) => {
        
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
            <TableRow key={expense.user_time_created}>
              <Expense
                {...expense}
                onEdit={() => handleEditClick(expense)}
                onDelete={() => handleDeleteExpense(expense.user_time_created)}
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
        users={users}
      />
    </Paper>
  );
}

export default ExpenseTable;
