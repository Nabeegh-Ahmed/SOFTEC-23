import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box className="w-screen h-screen bg-slate-100 flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
