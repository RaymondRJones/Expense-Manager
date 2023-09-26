import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import {CATEGORIES} from '../static';

const defaultExpenseData = {
  userId: '',
  category: '',
  description: '',
  cost: 0,
};

const ExpenseDialog = ({ isOpen, onClose, onSave, expense, users}) => {
    const [expenseData, setExpenseData] = useState({
      ...defaultExpenseData,
      ...(expense || {}),
    });
  

    useEffect(() => {
      setExpenseData(expense ? { ...expense } : defaultExpenseData);
    }, [expense]);

    const handleSave = () => {
      if (expenseData.userId && expenseData.category && expenseData.description && expenseData.cost) {
        onSave(expenseData);
        onClose();
      } else {
        alert("All fields are required!");
      }
    };

    return (
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{expense ? "Edit Expense" : "Add New Expense"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-dropdown-label">User</InputLabel>
            <Select
              labelId="user-dropdown-label"
              value={expenseData.userId}
              onChange={(e) => setExpenseData({ ...expenseData, userId: e.target.value })}

            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-dropdown-label">Category</InputLabel>
            <Select
              labelId="category-dropdown-label"
              value={expenseData.category}
              onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
            >
              {CATEGORIES.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={expenseData.description}
            onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Cost"
            type="number"
            value={expenseData.cost}
            onChange={(e) => setExpenseData({ ...expenseData, cost: parseFloat(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  };

export default ExpenseDialog;
