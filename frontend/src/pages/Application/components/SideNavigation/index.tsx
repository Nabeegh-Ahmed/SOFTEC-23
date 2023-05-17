import { Box, Divider } from "@mui/material";
import LogoFull from "../../../../components/LogoFull";
import SideNavLinkBox from "./components/SideNavLinkBox";
import SideNavigationItem from "./components/SideNavigationItem";
import { useState } from "react";
import SiteMap from "../../../../routing/Sitemap";
import { SideNavigationProps } from "./index.types";

const SideNavigation: React.FC<SideNavigationProps> = ({ tabs, selectedTab }) => {
  const [activeTab, setActiveTab] = useState(selectedTab);

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
  }

  return (
    <Box
      className="border-r-solid border-r-[1px] border-l-[1px] min-h-screen max-h-screen fixed left-0 bg-white flex flex-col"
      sx={{ width: "15rem" }}
    >
      <Box className="py-5 px-6">
        <LogoFull className="w-28" />
      </Box>

      <Box className="flex flex-col justify-between flex-1">
        <Box>
          <SideNavLinkBox>
            {
              Object.keys(tabs).map((tab) => {
                const { name, iconSrc, to } = tabs[tab];

                return (
                  <SideNavigationItem
                    key={tab}
                    showAlert={false}
                    active={activeTab == tab}
                    text={name}
                    iconSrc={iconSrc}
                    onClick={() => setActiveTab(tab)}
                    to={to}
                  />
                );
              })
            }
          </SideNavLinkBox>
        </Box>
        <Box>
          <SideNavLinkBox>
            <SideNavigationItem
              showAlert={false}
              active={false}
              text="Logout"
              iconSrc="/icons/Navigation 2.svg"
              onClick={handleLogout}
              to={SiteMap.Home?.path!}
            />
          </SideNavLinkBox>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavigation;
