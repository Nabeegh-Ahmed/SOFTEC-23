import { Box, Button } from "@mui/material";
import LogoFull from "../../../../components/LogoFull";
import HeaderLink from "../HeaderLink";
import CustomButton from "../../../../components/CustomButton";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";
import SiteMap from "../../../../routing/Sitemap";

const Header = () => {
  return (
    <Box className="p-5 flex items-center justify-between">
      <Box className="flex items-center">
        <LogoFull color="black" className="w-28" />
        <Box className="items-center hidden md:flex">
          <span className="border-[0.5px] border-solid border-black w-8 h-0 mx-8"></span>
          <HeaderLink title="How we work" href={SiteMap.HowWeWork.path} />
          {/* <HeaderLink title="Pricing" href="#" />
          <HeaderLink title="Resources" href="#" /> */}
        </Box>
      </Box>
      <Box className="flex items-center">
        <Box className="mr-2">
          <Link to={SiteMap.Login.path}>
            <CustomButton variant="outlined" startIcon={<LockOpenIcon />}>
              LOGIN
            </CustomButton>
          </Link>
        </Box>
        <Box>
          <Link to={SiteMap.Register.path}>
            <CustomButton variant="contained">REGISTER</CustomButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
