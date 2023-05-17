import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TOSNotice = () => {
  return (
    <React.Fragment>
      <Typography variant="subtitle2">
        By continuing, you agree to our{" "}
        <Link to={""} className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to={""} className="underline">
          Privacy Policy
        </Link>
        . Please reach out on{" "}
        <Link to="" className="underline">
          help@gamer.bazar
        </Link>{" "}
        to learn more.
      </Typography>
    </React.Fragment>
  );
};

export default TOSNotice;
