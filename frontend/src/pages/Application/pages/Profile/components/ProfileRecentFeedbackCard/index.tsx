import { Box, Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CallMadeIcon from "@mui/icons-material/CallMade";

const ProfileRecentFeedbackCard = () => {
  const AVATAR_SIZE = 50;
  return (
    <Box className="rounded-md w-full flex gap-2 items-start">
      <Box className="flex items-center gap-2">
        <Avatar
          src="/avatars/farhan.jpeg"
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
        />
        <Avatar
          src="/avatars/saqib.jpeg"
          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, ml: -2.5 }}
        />
      </Box>
      <Box>
        <Typography variant="body1" className="mt-2 px-2 text-gray-600">
          Saqib is a great developer. He is very professional and has a great
          attitude. I would definitely recommend him to anyone... &#8212; Farhan
          Ali
        </Typography>
        <Box className="mt-2 px-2">
          <Link to="/profile/farhan-ali">
            <Typography
              variant="body1"
              className="border-b-2 hover:border-b-4 transition-all ease-linear border-b-black w-fit"
            >
              Read More
              <CallMadeIcon sx={{ fontSize: 16, ml: 1 }} />
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileRecentFeedbackCard;
