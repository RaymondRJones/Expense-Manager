import React, { useState } from 'react';
import UserTable from './components/UserTable';
import ExpenseTable from './components/ExpenseTable';
import {users, expenses} from './static'
import { Container, Grid, Typography, Paper } from '@mui/material';
const App = () => {
    const [usersState, setUsersState] = useState(users);
    const [expensesState, setExpensesState] = useState(expenses);
    const findUserById = (userId) => {
      return usersState.find(user => user.id === userId);
    };

    const calculateTotalExpensesForUser = (userId) => {
        return expensesState
        .filter(expense => expense.user_id === userId)
        .reduce((acc, expense) => acc + expense.cost, 0);
    };
    
    const handleAddExpense = (newExpense) => {
      setExpensesState(prevExpenses => [...prevExpenses, newExpense]);
      const userToUpdate = usersState.find(user => user.time_created_at === newExpense.user_time_created);
      if (userToUpdate) {
        userToUpdate.total_expenses += newExpense.cost;
        setUsersState(prevUsers => 
          prevUsers.map(user => 
            user.id === userToUpdate.id ? userToUpdate : user
          )
        );
      }
    };
    /*
    const handleAddUser = (newUser) => {
      setExpensesState(prevExpenses => [...prevExpenses, newExpense]);
      const userToUpdate = usersState.find(user => user.id === newExpense.user_id);
      if (userToUpdate) {
        userToUpdate.total_expenses += newExpense.cost;
        setUsersState(prevUsers => 
          prevUsers.map(user => 
            user.id === userToUpdate.id ? userToUpdate : user
          )
        );
      }
    };
    const handleEditUser = (newUser) => {
      setExpensesState(prevExpenses => [...prevExpenses, newExpense]);
      const userToUpdate = usersState.find(user => user.id === newExpense.user_id);
      if (userToUpdate) {
        userToUpdate.total_expenses += newExpense.cost;
        setUsersState(prevUsers => 
          prevUsers.map(user => 
            user.id === userToUpdate.id ? userToUpdate : user
          )
        );
      }
    };
  */
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
              <ExpenseTable expenses={expenses} users={usersState} onAddExpense={handleAddExpense}/>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h6" align="center" gutterBottom>
                Users
              </Typography>
              <UserTable users={users} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
}

export default App;