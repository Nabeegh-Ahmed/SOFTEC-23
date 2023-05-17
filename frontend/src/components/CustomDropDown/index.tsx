import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { CustomDropdownProps } from './index.types'
import { Controller, useFormContext } from 'react-hook-form';

const CustomeDropDown: React.FC<CustomDropdownProps> = ({ name, options, selected, setSelected, className, disabled, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (

    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <Box className={className}>
          <FormControl fullWidth>
            <InputLabel>{name}</InputLabel>
            <Select
              {...field}
              name={label}
              value={selected}
              onChange={(e) => setSelected(e.target.value as string)}
              label={label}
              disabled={disabled}
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errors[label!]}>
              {errors[label!] ? (errors[label!]?.message as unknown as string) : ""}
            </FormHelperText>
          </FormControl>
        </Box>
      )}
    />
  );
};

export default CustomeDropDown