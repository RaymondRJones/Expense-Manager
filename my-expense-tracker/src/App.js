import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import ExpenseTable from './components/ExpenseTable';
import ExpenseSummary from './components/ExpenseSummary';
import { computeInitialTotals} from './util/expenseHelpers';
import {users, expenses} from './static'
import { Container, Grid, Typography, Paper } from '@mui/material';

const App = () => {
    // Closer to O(1) using a hash map for state
    const [usersState, setUsersState] = useState(users);
    const [expensesState, setExpensesState] = useState(expenses);
    const [memoizedTotalExpenses, setMemoizedTotalExpenses] = useState({});

    useEffect(() => {
      setMemoizedTotalExpenses(computeInitialTotals(expensesState));
    }, [expenses]);

    // one pass to copy entire expenses and add expense
    const handleAddExpense = (newExpense) => {
      setExpensesState(prevExpenses => ({
        ...prevExpenses,
        [newExpense.time_created_at]: newExpense
      }));

      setMemoizedTotalExpenses(prevTotals => ({
        ...prevTotals,
        [newExpense.user_time_created]: (prevTotals[newExpense.user_time_created] || 0) + newExpense.cost
      }));
    };
    
    const handleUpdateExpense = (updatedExpense) => {
      const oldExpense = expensesState[updatedExpense.time_created_at];
      const oldExpenseCost = oldExpense.cost;
      const oldUserId = oldExpense.user_time_created;
      const difference = updatedExpense.cost - oldExpenseCost;
    
      setExpensesState(prevExpenses => ({
        ...prevExpenses,
        [updatedExpense.time_created_at]: updatedExpense
      }));
    
      setMemoizedTotalExpenses(prevTotals => {
        // If the user is the same, just adjust by the difference
        if (oldUserId === updatedExpense.user_time_created) {
          const userTotal = (prevTotals[oldUserId] || 0) + difference;
          return {
            ...prevTotals,
            [oldUserId]: userTotal
          };
        } else {
          // Subtract the difference from the old user's total
          const oldUserTotal = (prevTotals[oldUserId] || 0) - oldExpenseCost;
          // Add the updatedExpense's cost to the new user's total
          const newUserTotal = (prevTotals[updatedExpense.user_time_created] || 0) + updatedExpense.cost;
    
          return {
            ...prevTotals,
            [oldUserId]: oldUserTotal,
            [updatedExpense.user_time_created]: newUserTotal
          };
        }
      });
    };
    
    const handleDeleteExpense = (deletedExpenseCreatedAt) => {
      setExpensesState(prevExpenses => {
        const updatedExpenses = { ...prevExpenses };
        delete updatedExpenses[deletedExpenseCreatedAt];
        return updatedExpenses;
      });
      const deletedExpenseCost = expensesState[deletedExpenseCreatedAt].cost;
      const userTimeCreated = expensesState[deletedExpenseCreatedAt].user_time_created;
      setMemoizedTotalExpenses(prevTotals => ({
        ...prevTotals,
        [userTimeCreated]: prevTotals[userTimeCreated] - deletedExpenseCost
      }));
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
              <UserTable users={Object.values(usersState)} onUserChange={handleUserChange} onUserCreation={handleNewUser} onUserDeletion={handleDeletedUser} expenses={Object.values(expensesState)} memoExpenses={memoizedTotalExpenses}/>
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