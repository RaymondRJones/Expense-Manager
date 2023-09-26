import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import ExpenseTable from './components/ExpenseTable';
import ExpenseSummary from './components/ExpenseSummary';
import {users, expenses} from './static'
import { Container, Grid, Typography, Paper } from '@mui/material';

const App = () => {
    // Uses Hashmap to use O(1) add, update, and delete with O(N) space
    const [usersState, setUsersState] = useState(users);
    const [expensesState, setExpensesState] = useState(expenses);
    const [memoizedTotalExpenses, setMemoizedTotalExpenses] = useState({});
  
    const handleAddExpense = (newExpense) => {
      setExpensesState(prevExpenses => ({
        ...prevExpenses,
        [newExpense.time_created_at]: newExpense
      }));
    };
    
    const handleUpdateExpense = (updatedExpense) => {
      setExpensesState(prevExpenses => ({
        ...prevExpenses,
        [updatedExpense.time_created_at]: updatedExpense
      }));
    };
    
    const handleDeleteExpense = (deletedExpenseCreatedAt) => {
      setExpensesState(prevExpenses => {
        const updatedExpenses = { ...prevExpenses };
        delete updatedExpenses[deletedExpenseCreatedAt];
        return updatedExpenses;
      });
    };
    
    const handleUserChange = (updatedUser) => {
      setUsersState(prevUsers => ({
        ...prevUsers,
        [updatedUser.time_created_at]: updatedUser
      }));
    };
    
    const handleNewUser = (newUser) => {
      setUsersState(prevUsers => ({
        ...prevUsers,
        [newUser.time_created_at]: newUser
      }));
    };
    
    const handleDeletedUser = (deletedUserTimeCreatedAt) => {
      setUsersState(prevUsers => {
        const updatedUsers = { ...prevUsers };
        delete updatedUsers[deletedUserTimeCreatedAt];
        return updatedUsers;
      });
    
      // Remove all expenses for that deleted user
      setExpensesState(prevExpenses => {
        const updatedExpenses = { ...prevExpenses };
        for (let expenseCreatedAt in updatedExpenses) {

          if (updatedExpenses[expenseCreatedAt].user_time_created === deletedUserTimeCreatedAt) {
            delete updatedExpenses[expenseCreatedAt];
          }
        }
        return updatedExpenses;
      });
    };
    

    return (
      <Container maxWidth="lg" className="main-container">
        <Typography variant="h4" align="center" gutterBottom>
          Expense Tracker
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Expenses
              </Typography>
              <ExpenseTable expenses={Object.values(expensesState)} users={Object.values(usersState)} onAddExpense={handleAddExpense} onDeleteExpense={handleDeleteExpense} onUpdateExpense={handleUpdateExpense}/>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Users
              </Typography>
              <UserTable users={Object.values(usersState)} onUserChange={handleUserChange} onUserCreation={handleNewUser} onUserDeletion={handleDeletedUser} expenses={Object.values(expensesState)}/>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseSummary expenses={Object.values(expensesState)} />
        </Grid>
      </Container>
    );
}

export default App;