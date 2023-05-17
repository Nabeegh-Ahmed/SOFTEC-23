import { Box, Avatar, Typography, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Verified, ErrorOutline } from "@mui/icons-material";
import { coverphoto as defaultcoverphoto } from "../../../../../../assets/profile/cover";
import CustomButton from "../../../../../../components/CustomButton";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import React from "react";
import { ProfileHeaderProps } from "./index.types";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const AVATAR_SIZE = 150;
  return (
    <Box className="mt-5 min-h-[350px]">
      <Box className="relative">
        <Box
          className="w-full rounded-md bg-blue-100 min-h-[200px]"
          sx={{
            background: user.coverphoto ? `url(${user.coverphoto})` : defaultcoverphoto,
          }}
        ></Box>
        <Box className="absolute bottom-[-125px] flex justify-between items-center w-full">
          <Box className="flex gap-8 items-center pl-4">
            <Avatar
              src={user.photo}
              className="border-white border-4 shadow-sm"
              sx={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
              }}
            />

            <Box>
              <Box className="flex items-center gap-2">
                <Typography variant="h5" fontWeight="bold">
                  {user.name}
                </Typography>
                {
                  user.isVerified ? (
                    <Tooltip
                      title="This user's profile is verified. You can deal with them without any hesitation."
                      arrow
                      placement="right"
                    >
                      <Verified color="success" />
                    </Tooltip>
                  )
                    : (
                      <Tooltip
                        title="This user's profile is not verified. You should deal with them carefully."
                        arrow
                        placement="right"
                      >
                        <ErrorOutline color="error" />
                      </Tooltip>
                    )
                }
              </Box>
              <Typography variant="body1" className="text-gray-500">
                {
                  user.bio ? user.bio : "This user has not written anything about themselves."
                }
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;