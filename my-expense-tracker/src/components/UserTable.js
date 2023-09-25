import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UserDialog from './UserDialog';

const UserTable = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddUser = (selectedUser) => {
    const firstName = selectedUser.firstName;
    const lastName = selectedUser.lastName;
    
    const newUser = {
      firstName,
      lastName,
      total_expenses: 0,
      time_created_at: new Date().toISOString(),
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    handleClose();
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
    handleClose();
  };

  const handleDeleteUser = (time_created_at) => {
    setUsers(prevUsers => prevUsers.filter(user => user.time_created_at !== time_created_at));
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
              <TableCell>{user.total_expenses}</TableCell>
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
