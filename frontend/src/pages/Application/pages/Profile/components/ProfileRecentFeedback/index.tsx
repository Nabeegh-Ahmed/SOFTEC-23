import { Box, Typography } from "@mui/material";
import ProfileRecentFeedbackCard from "../ProfileRecentFeedbackCard";

const ProfileRecentFeedback = () => {
  return (
    <Box className="border-[1px] border-gray-200 p-5 px-6 min-h-[180px] rounded-md">
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Recent Feedback
        </Typography>
        <Box className="mt-4">
          <ProfileRecentFeedbackCard />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileRecentFeedback;
