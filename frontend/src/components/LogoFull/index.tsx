import logoFullBlack from "../../assets/branding/logo-full-black.svg";
import logoFullWhite from "../../assets/branding/logo-full-white.svg";
import logo from "../../assets/branding/logo.png";
import { useMediaQuery } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LogoFull = ({
  color,
  className,
}: {
  color: string;
  className: string;
}) => {
  return (
    <React.Fragment>
      <Link to="/" className="w-fit">
        <img
          className={className}
          src={logo}
        />
      </Link>
    </React.Fragment>
  );
};

export default LogoFull;

LogoFull.defaultProps = {
  color: "black",
  className: "w-full",
};
