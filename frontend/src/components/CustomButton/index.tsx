import { Button, ButtonProps } from "@mui/material";

const CustomButton = (props: ButtonProps) => {
  return (
    <Button sx={{ textTransform: 'none' }} disableElevation {...props} />
  );
};

export default CustomButton;
