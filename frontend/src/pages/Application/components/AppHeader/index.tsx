import {
  Divider,
  Box,
  Input,
  Typography,
  Avatar,
  InputAdornment,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { abbreviateCurrency } from "../../../../utils/currency";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SiteMap from "../../../../routing/Sitemap";
import { UserContext } from "../../../../contexts/UserContext";

const AppHeader = () => {
  const { state } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <React.Fragment>
      <Box className="flex justify-between gap-5">
        <form className="w-full" onSubmit={(e) => {
          e.preventDefault()
          if (state.user?.role === "admin") navigate(`/admin?search=${searchQuery}`)
          else navigate(`/app?search=${searchQuery}`)
        }}>
          <Input
            className="px-4 py-2 rounded-lg text-sm bg-gray-100"
            placeholder="search for items..."
            disableUnderline
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={  
              <InputAdornment position="start">
                <BiSearch />
              </InputAdornment>
            }
          />
        </form>
        {/* <Box className="p-2 px-4 border border-solid border-black rounded-md flex justify-center items-center">
          <Typography variant="body1" fontWeight="bold" className="whitespace-nowrap text-lg">PKR {abbreviateCurrency(42879976)}</Typography>
        </Box> */}
        <Link to={SiteMap.Dashboard.children?.Profile?.relativePath!}>
          <Box className="flex justify-center items-center">
            <Box className="text-right">
              <Typography
                variant="body1"
                className="whitespace-nowrap"
                fontWeight="bold"
              >
                {state.user?.name}
              </Typography>
              <Typography
                variant="body2"
                className="whitespace-nowrap text-gray-500"
              >
                {state.user?.email}
              </Typography>
            </Box>
            <Avatar className="ml-5" src={""}>
              S
            </Avatar>
          </Box>
        </Link>
      </Box>
    </React.Fragment>
  );
};

export default AppHeader;
