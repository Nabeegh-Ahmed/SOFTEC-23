import { Divider, Box } from "@mui/material";
import React from "react";

const SideNavLinkBox = ({
  children,
  showDivider,
}: {
  children: React.ReactNode;
  showDivider: boolean;
}) => {
  return (
    <React.Fragment>
      {showDivider && <Divider />}
      <Box className="p-3">{children}</Box>
    </React.Fragment>
  );
};

export default SideNavLinkBox;

SideNavLinkBox.defaultProps = {
  showDivider: true,
};
