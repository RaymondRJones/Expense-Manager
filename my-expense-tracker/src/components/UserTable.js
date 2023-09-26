import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';
import UserDialog from './UserDialog';

const UserTable = ({ users: initialUsers, onUserChange, onUserCreation, onUserDeletion, expenses, memoExpenses }) => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddUser = (selectedUser) => {
    const firstName = selectedUser.firstName;
    const lastName = selectedUser.lastName;
    const currentDate = new Date();
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

    const newUser = {
      firstName,
      lastName,
      total_expenses: 0,
      time_created_at: unixTimestamp,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    onUserCreation(newUser);
    handleClose();
  };

   // O(N) on initial load
   // Can make it O(1) on expense delete/create by using indexed array or hash_map
  const calculateTotalExpensesForUser = (user_time_created) => {
    const userExpenses = expenses.filter(expense => expense.user_time_created === user_time_created);
    return userExpenses.reduce((acc, expense) => acc + expense.cost, 0);
  };

  const handleUpdateUser = (selectedUser) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.time_created_at === selectedUser.time_created_at) {
          return selectedUser;
        }
        return user;
      });
    });
    onUserChange(selectedUser)
    handleClose();
  };

  const handleDeleteUser = (time_created_at) => {
    setUsers(prevUsers => prevUsers.filter(user => user.time_created_at !== time_created_at));
    onUserDeletion(time_created_at)
    setSelectedUser(null);
  };

  const handleEditClick = (time_created_at) => {
    const userToEdit = users.find(user => user.time_created_at === time_created_at);
    setSelectedUser(userToEdit);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <Paper className="user-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Total Expenses</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.time_created_at}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>${memoExpenses[user.time_created_at] || 0}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(user.time_created_at)}>Edit</Button>
                <Button onClick={() => handleDeleteUser(user.time_created_at)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Add User</Button>
      </div>
      <UserDialog 
        isOpen={isDialogOpen} 
        user={selectedUser} 
        onClose={() => setDialogOpen(false)} 
        onSave={selectedUser ? handleUpdateUser : handleAddUser}
      />
    </Paper>
  );
}

export default UserTable;
