import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useContext } from "react";
import { UserContext } from "../../../../../../contexts/UserContext";
import { formatTimeForLastMessage } from "../../../../../../utils/time";

const ProfileAbout = () => {
  const {state} = useContext(UserContext)
  return (
    <Box className="p-5 px-6 bg-gray-100 rounded-md w-full min-h-[180px]">
      <Box>
        <Typography variant="h5" fontWeight="bold">
          About Me
        </Typography>
        <Box className="mt-12">
          {/* @ts-ignore */}
          <Typography variant="subtitle1">Joined {formatTimeForLastMessage(state.user?.createdAt)}</Typography>
          <Link to={`mailto:${state.user?.email}`}>
            <Typography
              variant="subtitle1"
              className="border-b-2 hover:border-b-4 transition-all ease-linear border-b-black w-fit"
            >
              {state.user?.email}
              <CallMadeIcon sx={{ fontSize: 16, ml: 1 }} />
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileAbout;
