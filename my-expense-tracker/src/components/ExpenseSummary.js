import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ExpenseSummary = ({ expenses }) => {

  const calculateTotalForCategory = (category) => {
    const total = expenses.filter(exp => exp.category === category).reduce((acc, curr) => acc + curr.cost, 0);
    return parseFloat(total.toFixed(2));
  }

  const uniqueCategories = [...new Set(expenses.map(exp => exp.category))];

  return (
    <Paper elevation={3}>
      <Typography variant="h6" align="center" gutterBottom>
        Summary of Expenses
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Total Expenses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueCategories.map(category => (
            <TableRow key={category}>
              <TableCell>{category}</TableCell>
              <TableCell>${calculateTotalForCategory(category)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ExpenseSummary;
