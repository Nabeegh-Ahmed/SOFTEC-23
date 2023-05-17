import { Box } from "@mui/material";

const HeroGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="flex justify-center min-h-screen">
      <Box className="md:flex-row my-16 md:py-0 flex-col flex justify-center w-full max-w-7xl">
        {children}
      </Box>
    </Box>
  );
};

export default HeroGrid;

const HeroGridItem = ({ children }: { children: React.ReactNode }) => {
  return <Box className="w-full p-5">{children}</Box>;
};

export { HeroGridItem };
