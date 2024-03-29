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

import { DATE_TIME_FORMATS } from 'models/others';
import { ProvidedExpensesContext, ExpensesContext } from 'providers/ExpensesProvider';

interface ExpenseFormDialogProps {
  onDialogClose: () => void;
}

interface ExpenseFormData {
  name: string;
  cost: number;
  date: moment.Moment;
  description: string;
}

const ExpenseFormDialog: React.FC<ExpenseFormDialogProps> = ({ onDialogClose }) => {
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState<ExpenseFormData>({
    name: '',
    cost: 0.99,
    date: moment(),
    description: ''
  });
  const { handleAddExpense }: ProvidedExpensesContext = useContext(ExpensesContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;
    setExpenseFormData({ ...expenseFormData, [key]: value });
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    if (!date) {
      return;
    }
    setExpenseFormData({ ...expenseFormData, date });
  };

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

  return (
    <Dialog onClose={onDialogClose} open>
      {isAddingExpense ? 'Saving' : ''}
      <DialogTitle>Add expense</DialogTitle>
      <DialogContent>
        <DialogContentText>Populated required fields and create your expense.</DialogContentText>

        <Box>
          <FormControl fullWidth>
            <InputLabel htmlFor='expense-name'>Expense name</InputLabel>
            <Input id='expense-name' name='name' value={expenseFormData.name} onChange={handleFieldChange} />
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
              onChange={handleFieldChange}
            />
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <DateTimePicker label='Date and time' autoOk ampm={false} value={expenseFormData.date} onChange={handleDateChange} />
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
              onChange={handleFieldChange}
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
