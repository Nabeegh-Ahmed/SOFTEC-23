import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../../../../contexts/UserContext";

const Greetings = () => {
  const {state} = useContext(UserContext)
  return (
    <Box className="w-full mt-10">
      <Typography variant="h5" fontWeight="bold">
        Hello, {state.user?.name} 👋🏽
      </Typography>
      <Typography variant="body1" className="text-gray-500">
        Welcome to your dashboard!
      </Typography>
    </Box>
  );
};

export default Greetings;
