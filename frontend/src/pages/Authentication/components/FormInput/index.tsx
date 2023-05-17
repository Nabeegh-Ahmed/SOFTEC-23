import { FormControl, FormHelperText, TextField, Box } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./index.types";

const FormInput = ({ name, label, ...otherProps }: FormInputProps) => {
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
        <Box className="mb-2">
          <FormControl fullWidth>
            <TextField
              {...field}
              {...otherProps}
              error={!!errors[name]}
              fullWidth
              label={label}
            />
            <FormHelperText error={!!errors[name]}>
              {errors[name] ? (errors[name]?.message as unknown as string) : ""}
            </FormHelperText>
          </FormControl>
        </Box>
      )}
    />
  );
};

export default FormInput;
