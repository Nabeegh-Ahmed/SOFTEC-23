import { Box } from "@mui/material";

const SideNavAlert = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="relative">
      <span className="absolute w-2 h-2 bg-red-500 rounded-full right-0 z-10"></span>
      {children}
    </Box>
  );
};

export default SideNavAlert;