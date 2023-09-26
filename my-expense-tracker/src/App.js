import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import ExpenseTable from './components/ExpenseTable';
import ExpenseSummary from './components/ExpenseSummary';
import {users, expenses} from './static'
import { Container, Grid, Typography, Paper } from '@mui/material';

const App = () => {
    const [usersState, setUsersState] = useState(users);
    const [expensesState, setExpensesState] = useState(expenses);
    // Could maybe add these into a helper file to simplify this component
    const handleAddExpense = (newExpense) => {
      setExpensesState(prevExpenses => [...prevExpenses, newExpense]);
    };
    const handleUpdateExpense = (updatedExpense) => {
      setExpensesState(prevExpenses => 
        prevExpenses.map(expense => 
          expense.time_created_at === updatedExpense.time_created_at ? updatedExpense : expense
        )
      );
    };
    const handleDeleteExpense = (deletedExpenseCreatedAt) => {
      const updatedExpenses = expensesState.filter(expense => expense.time_created_at !== deletedExpenseCreatedAt);

      setExpensesState(updatedExpenses);
    };

    const handleUserChange = (updatedUser) => {
      const updatedUsers = usersState.map(user => 
          user.time_created_at === updatedUser.time_created_at ? updatedUser : user
      );
      setUsersState(updatedUsers);
    }

    const handleNewUser = (newUser) => {
      setUsersState(prevUsers => [...prevUsers, newUser]);
    }

    const handleDeletedUser = (deletedUserTimeCreatedAt) => {
      console.log(expensesState, "before")
      // Remove the user from the usersState
      const updatedUsers = usersState.filter(user => user.time_created_at !== deletedUserTimeCreatedAt);
      setUsersState(updatedUsers);
    
      // Remove all expenses for that deleted user
      const updatedExpenses = expensesState.filter(expense => expense.user_time_created !== deletedUserTimeCreatedAt);
      console.log(updatedExpenses)
      setExpensesState(updatedExpenses);
    }

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
              <ExpenseTable expenses={expensesState} users={usersState} onAddExpense={handleAddExpense} onDeleteExpense={handleDeleteExpense} onUpdateExpense={handleUpdateExpense}/>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Users
              </Typography>
              <UserTable users={usersState} onUserChange={handleUserChange} onUserCreation={handleNewUser} onUserDeletion={handleDeletedUser} expenses={expensesState}/>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseSummary expenses={expensesState} />
        </Grid>
      </Container>
    );
}

export default App;