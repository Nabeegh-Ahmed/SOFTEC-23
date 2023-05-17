import React from "react";
import { Typography } from "@mui/material";

const AuthPageTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <React.Fragment>
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        {subtitle}
      </Typography>
    </React.Fragment>
  );
};

export default AuthPageTitle;
