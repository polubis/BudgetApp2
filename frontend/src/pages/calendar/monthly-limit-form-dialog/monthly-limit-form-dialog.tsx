import React, { useState, useContext } from 'react';
import { finalize } from 'rxjs/operators';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Switch,
  TextField
} from '@material-ui/core';

import { ExpensesContext, ProvidedExpensesContext } from 'providers/ExpensesProvider';
import { AvailableCurrencies, CURRENCIES } from 'models/others';

interface MonthlyLimitFormDialogProps {
  activeMonth: number;
  activeYear: number;
  onDialogClose: () => void;
}

interface MonthlyLimitFormData {
  limit: number;
  currency: AvailableCurrencies;
  setForEachMonthInYear: boolean;
}

const MonthlyLimitFormDialog: React.FC<MonthlyLimitFormDialogProps> = ({ activeMonth, activeYear, onDialogClose }) => {
  const [monthlyLimitFormData, setMonthlyLimitFormData] = useState<MonthlyLimitFormData>({
    limit: 1600,
    currency: '$',
    setForEachMonthInYear: false
  });
  const [isSavingLimit, setIsSavingLimit] = useState(false);
  const { handleUpdateMonthlyLimit }: ProvidedExpensesContext = useContext(ExpensesContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: key, value } = e.target;
    setMonthlyLimitFormData({ ...monthlyLimitFormData, [key]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsSavingLimit(true);

    handleUpdateMonthlyLimit(
      {
        limit: monthlyLimitFormData.limit,
        currency: monthlyLimitFormData.currency,
        month: activeMonth,
        year: activeYear
      },
      monthlyLimitFormData.setForEachMonthInYear
    )
      .pipe(finalize(() => setIsSavingLimit(false)))
      .subscribe();
  };

  return (
    <Dialog onClose={onDialogClose} open>
      {isSavingLimit ? 'saving' : ''}
      <DialogTitle>Set monthly limit settings</DialogTitle>
      <DialogContent>
        <DialogContentText>Populate required fields and submit.</DialogContentText>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor='limit'>Limit</InputLabel>
            <Input
              id='limit'
              name='limit'
              type='number'
              inputProps={{ min: '1', max: '1000000', step: '0.01' }}
              value={monthlyLimitFormData.limit}
              onChange={handleFieldChange}
            />
            <FormHelperText id='limit-description-text'>
              The limit will be used to build your statistics and to inform you when it is exceeded
            </FormHelperText>
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <TextField
              id='currency'
              select
              name='currency'
              label='Currency'
              helperText='We are using currency to perform needed calculations'
              value={monthlyLimitFormData.currency}
              onChange={handleFieldChange}
            >
              {CURRENCIES.map(currency => (
                <MenuItem key={currency.name} value={currency.symbol}>
                  ({currency.symbol}) {currency.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>

        <Box paddingTop={2}>
          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Switch
                  name='setForEachMonthInYear'
                  color='primary'
                  value={monthlyLimitFormData.setForEachMonthInYear}
                  onChange={handleFieldChange}
                />
              }
              label='Set this settings for all months in this year'
            />
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

export default MonthlyLimitFormDialog;
