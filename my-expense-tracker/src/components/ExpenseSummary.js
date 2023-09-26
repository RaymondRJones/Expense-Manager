import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ExpenseSummary = ({ expenses }) => {

  const totalsByCategory = expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0;
    }
    acc[curr.category] += curr.cost;
    return acc;
  }, {});

  const uniqueCategories = Object.keys(totalsByCategory);

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
              <TableCell>${parseFloat(totalsByCategory[category].toFixed(2))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ExpenseSummary;
