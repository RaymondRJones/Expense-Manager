import { useEffect } from 'react';
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const UserDialog = ({ isOpen, user, onClose, onSave }) => {
    const [tempUser, setTempUser] = React.useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        total_expenses: user?.total_expenses || 0,
        time_created_at: user?.time_created_at || Math.floor(Date.now() / 1000)
    });

    const isValidInput = () => {
        return tempUser.firstName && tempUser.lastName;
    };

    useEffect(() => {
        setTempUser({
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
            total_expenses: user?.total_expenses || 0,
            time_created_at: user?.time_created_at || Math.floor(Date.now() / 1000) // Unix timestamp
          });
    }, [user]);

    const handleSave = () => {
        if (!isValidInput){
            return
        }

        onSave(tempUser);
        onClose();
    };

    return (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
        <TextField label="First Name" fullWidth value={tempUser.firstName} onChange={(e) => setTempUser({ ...tempUser, firstName: e.target.value })} />
        <TextField label="Last Name" fullWidth value={tempUser.lastName} onChange={(e) => setTempUser({ ...tempUser, lastName: e.target.value })} />
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} disabled={!isValidInput()}>Save</Button>
        </DialogActions>
    </Dialog>
    );
    };

export default UserDialog;