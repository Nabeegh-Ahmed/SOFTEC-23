import React from 'react'
import { Box, FormControl, FormHelperText, TextField, } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/lab';
import { CustomDatePickerProps } from './index.types';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label, name, className, disabled, minDate, maxDate, placeholder
}) => {

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="date"
      render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
        <DatePicker
          {...field}
          inputRef={ref}
          label="Date"
          renderInput={(inputProps: any) => (
            <TextField
              {...inputProps}
              onBlur={onBlur}
              name={name}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  )
}

export default CustomDatePicker