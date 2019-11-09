import React, { useState, useContext } from 'react';
import { finalize } from 'rxjs/operators';
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
  InputLabel
} from '@material-ui/core';
import { DateTimePicker, MaterialUiPickersDate } from '@material-ui/pickers';

import { DATE_TIME_FORMATS } from 'models/consts/DateAndTime';
import { ProvidedExpensesContext, ExpensesContext } from 'providers/ExpensesProvider';

interface ExpenseFormDialog {
  onDialogClose: () => void;
}

const ExpenseFormDialog: React.FC<ExpenseFormDialog> = ({ onDialogClose }) => {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({
    name: '',
    cost: 0.99,
    date: moment(),
    description: ''
  });
  const { handleAddExpense }: ProvidedExpensesContext = useContext(ExpensesContext);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isAddingExpense) {
      return;
    }

    setIsAddingExpense(true);

    const { name, cost, date, description } = expenseFormData;

    handleAddExpense({ name, cost, date: date.format(DATE_TIME_FORMATS.DATE_TIME), description })
      .pipe(finalize(() => setIsAddingExpense(false)))
      .subscribe();
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key } = e.currentTarget;
    const { value } = e.target;
    setExpenseFormData({ ...expenseFormData, [key]: value });
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (!date) {
      return;
    }
    setExpenseFormData({ ...expenseFormData, date });
  };

  return (
    <Dialog onClose={onDialogClose} aria-labelledby='customized-dialog-title' open>
      {isAddingExpense ? 'Saving' : ''}
      <DialogTitle>Add expense</DialogTitle>
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
            <DateTimePicker autoOk ampm={false} value={expenseFormData.date} onChange={handleDateChange} label='Date and time' />
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
        <Button color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseFormDialog;
