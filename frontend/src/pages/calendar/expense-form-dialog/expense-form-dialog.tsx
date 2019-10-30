import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  FormHelperText,
  InputLabel
} from '@material-ui/core';

type ExpenseFormDialog = {
  isDialogOpen: boolean;
  onDialogClose: () => void;
};

const ExpenseFormDialog: React.FC<ExpenseFormDialog> = ({ isDialogOpen, onDialogClose }) => {
  return (
    <Dialog onClose={onDialogClose} aria-labelledby='customized-dialog-title' open={isDialogOpen}>
      <DialogTitle>Create expense</DialogTitle>
      <DialogContent>
        <DialogContentText>Populated required fields and create your expense.</DialogContentText>

        <Box>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-name'>Expense name</InputLabel>
            <Input id='expense-name' />
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-cost'>Cost</InputLabel>
            <Input id='expense-cost' />
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-description'>Description</InputLabel>
            <Input id='expense-description' aria-describedby='expense-description-text' multiline rows={4} />
            <FormHelperText id='expense-description-text'>Will be needed later when you forget what you spent the money on.</FormHelperText>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onDialogClose} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseFormDialog;
