import React, { useState } from 'react';
import moment from 'moment';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField
} from '@material-ui/core';

import { expensesService, Expense } from 'features/expenses';
import { getTime } from 'features/date-time-management';
import { useAuthUser } from 'features/authorization';

type ExpenseFormDialog = {
  expensesDate: string;
  onDialogClose: () => void;
};

const ExpenseFormDialog: React.FC<ExpenseFormDialog> = ({ expensesDate, onDialogClose }) => {
  const [isSavingExpense, setIsSavingExpense] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    name: '',
    cost: 0.99,
    time: getTime(moment()),
    description: ''
  });

  const authUser = useAuthUser();

  const handleAddExpense = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isSavingExpense) {
      return;
    }

    try {
      setIsSavingExpense(true);
      const expense: Expense = { ...expenseFormData, cost: +expenseFormData.cost, date: expensesDate };
      await expensesService.addExpense(authUser.email, expense);
    } catch (err) {
    } finally {
      setIsSavingExpense(false);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key } = e.currentTarget;
    const { value } = e.target;
    setExpenseFormData(prevExpenseFormData => ({ ...prevExpenseFormData, [key]: value }));
  };

  return (
    <Dialog onClose={onDialogClose} aria-labelledby='customized-dialog-title' open>
      {isSavingExpense ? 'Saving' : ''}
      <DialogTitle>Create expense</DialogTitle>
      <DialogContent>
        <DialogContentText>Populated required fields and create your expense.</DialogContentText>

        <Box>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-name'>Expense name</InputLabel>
            <Input id='expense-name' name='name' value={expenseFormData.name} onChange={handleTyping} />
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-cost'>Cost</InputLabel>
            <Input
              id='expense-cost'
              name='cost'
              type='number'
              inputProps={{ min: '1', max: '1000000', step: '0.01' }}
              value={expenseFormData.cost}
              onChange={handleTyping}
            />
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <TextField id='time' label='Time' name='time' type='time' value={expenseFormData.time} onChange={handleTyping} />
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-description'>Description</InputLabel>
            <Input
              id='expense-description'
              name='description'
              aria-describedby='expense-description-text'
              multiline
              rows={4}
              value={expenseFormData.description}
              onChange={handleTyping}
            />
            <FormHelperText id='expense-description-text'>Will be needed later when you forget what you spent the money on.</FormHelperText>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={onDialogClose}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleAddExpense}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseFormDialog;
