import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import ExpenseTable from './components/ExpenseTable';
import ExpenseSummary from './components/ExpenseSummary';
import { computeInitialTotals} from './util/expenseHelpers';
import {USERS, EXPENSES} from './static'
import { Container, Grid, Typography, Paper } from '@mui/material';

const MainScreen = () => {
    const [users, setUsers] = useState(USERS);
    const [expenses, setExpenses] = useState(EXPENSES);
    const [totalExpensesByUser, setTotalExpensesByUser] = useState({});

    useEffect(() => {
      setTotalExpensesByUser(computeInitialTotals(expenses));
    }, [expenses]);

    // Updates state when new Expense is added
    const handleAddExpense = (newExpense) => {
      setExpenses(prevExpenses => ({
        ...prevExpenses,
        [newExpense.time_created_at]: newExpense
      }));

      setTotalExpensesByUser(prevTotals => ({
        ...prevTotals,
        [newExpense.user_time_created]: (prevTotals[newExpense.user_time_created] || 0) + newExpense.cost
      }));
    };
    // Updates state when new Expense is edited
    const handleUpdateExpense = (updatedExpense) => {
      const oldExpense = expenses[updatedExpense.time_created_at];
      const oldExpenseCost = oldExpense.cost;
      const oldUserId = oldExpense.user_time_created;
      const difference = updatedExpense.cost - oldExpenseCost;
    
      setExpenses(prevExpenses => ({
        ...prevExpenses,
        [updatedExpense.time_created_at]: updatedExpense
      }));

      // Should be broken into a separate function but I'm short on time
      // AdjustBudgetForUser(UserTimeStamp)
      setTotalExpensesByUser(prevTotals => {
        // If the user is the same, just adjust by the difference
        if (oldUserId === updatedExpense.user_time_created) {
          const userTotal = (prevTotals[oldUserId] || 0) + difference;
          return {
            ...prevTotals,
            [oldUserId]: userTotal
          };
        } else {
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
    // Updates state when new Expense is delete
    const handleDeleteExpense = (deletedExpenseCreatedAt) => {
      setExpenses(prevExpenses => {
        const updatedExpenses = { ...prevExpenses };
        delete updatedExpenses[deletedExpenseCreatedAt];
        return updatedExpenses;
      });
      const deletedExpenseCost = expenses[deletedExpenseCreatedAt].cost;
      const userTimeCreated = expenses[deletedExpenseCreatedAt].user_time_created;
      setTotalExpensesByUser(prevTotals => ({
        ...prevTotals,
        [userTimeCreated]: prevTotals[userTimeCreated] - deletedExpenseCost
      }));
    };
    // Updates state when a user changes
    const handleUserChange = (updatedUser) => {
      setUsers(prevUsers => ({
        ...prevUsers,
        [updatedUser.time_created_at]: updatedUser
      }));
    };
    // Updates state when a new user is added
    const handleNewUser = (newUser) => {
      setUsers(prevUsers => ({
        ...prevUsers,
        [newUser.time_created_at]: newUser
      }));
    };
    // Updates state when a user is deleted and removes all their expenses
    const handleDeletedUser = (deletedUserTimeCreatedAt) => {
      setUsers(prevUsers => {
        const updatedUsers = { ...prevUsers };
        delete updatedUsers[deletedUserTimeCreatedAt];
        return updatedUsers;
      });
    
      // Remove all expenses for that deleted user
      setExpenses(prevExpenses => {
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
              <ExpenseTable expenses={Object.values(expenses)} users={Object.values(users)} onAddExpense={handleAddExpense} onDeleteExpense={handleDeleteExpense} onUpdateExpense={handleUpdateExpense}/>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Users
              </Typography>
              <UserTable users={Object.values(users)} onUserChange={handleUserChange} onUserCreation={handleNewUser} onUserDeletion={handleDeletedUser} expenses={Object.values(expenses)} memoExpenses={totalExpensesByUser}/>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <ExpenseSummary expenses={Object.values(expenses)} />
        </Grid>
      </Container>
    );
}

export default MainScreen;