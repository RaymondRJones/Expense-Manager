import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';
import UserDialog from './UserDialog';
import { v4 as uuidv4 } from 'uuid';
const UserTable = ({ users: initialUsers, onUserChange, onUserCreation, onUserDeletion, expenses, memoExpenses }) => {
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
      id: uuidv4(),
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    onUserCreation(newUser);
    handleDialogClose();
  };

  const handleUpdateUser = (selectedUser) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === selectedUser.id) {
          return selectedUser;
        }
        return user;
      });
    });
    onUserChange(selectedUser)
    handleDialogClose();
  };

  const handleDeleteUser = (id) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    onUserDeletion(id)
    setSelectedUser(null);
  };

  const handleEditClick = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setSelectedUser(userToEdit);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
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
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>${memoExpenses[user.id] || 0}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(user.id)}>Edit</Button>
                <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
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
