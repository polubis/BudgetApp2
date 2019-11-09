import React, { useState, useCallback } from 'react';

import { Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

import { AVAILABLE_YEARS } from 'models/consts/DateAndTime';

import './year-picker.scss';

interface YearPickerProps {
  activeYear: number;
  onYearChange: (year: number) => void;
};

const YearPicker = ({ activeYear, onYearChange }: YearPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget);
  }, []);

  const handleMenuClose = useCallback((): void => {
    setAnchorEl(null);
  }, []);

  const handleYearClick = (e: React.MouseEvent<HTMLElement>): void => {
    handleMenuClose();
    onYearChange(+e.currentTarget.getAttribute('data-year')!);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title='Change year'>
        <Button
          aria-haspopup='true'
          aria-controls='years-menu'
          onClick={handleButtonClick}
          className={`year-picker ${open ? 'year-picker-expanded' : ''}`}
        >
          {activeYear}
          <ExpandMore />
        </Button>
      </Tooltip>
      <Menu
        id='years-menu'
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        keepMounted
        PaperProps={{
          style: {
            maxHeight: 450,
            width: 200
          }
        }}
      >
        {AVAILABLE_YEARS.map(year => (
          <MenuItem key={year} data-year={year} selected={year === activeYear} onClick={handleYearClick}>
            {year}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default YearPicker;
