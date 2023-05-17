import Page from "../../components/Page";
import SideNavigation from "./components/SideNavigation";
import { Box, Grid } from "@mui/material";
import AppHeader from "./components/AppHeader";
import AppRoutes from "../../routing";
import SiteMap from "../../routing/Sitemap";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const tabs = {
  MARKETPLACE: {
    name: "Marketplace",
    iconSrc: "/icons/Category.svg",
    to: SiteMap.Dashboard.children?.Home?.relativePath,
  },
  CART: {
    name: "Cart",
    iconSrc: "/icons/folder.svg",
    to: SiteMap.Dashboard.children?.Cart?.relativePath,
  },
  DISPUTES: {
    name: "Disputes",
    iconSrc: "/icons/file-text_delete.svg",
    to: SiteMap.Dashboard.children?.Disputes?.relativePath,
  },
  PROFILE: {
    name: "Profile",
    iconSrc: "/icons/user_1.svg",
    to: SiteMap.Dashboard.children?.Profile?.relativePath,
  },
}



const Dashboard = () => {
  const {state} = useContext(UserContext)
  const navigate = useNavigate()
  useEffect(() => {
      if (state.user?.role !== "user") {
          navigate("/")
      }
  }, [])
  return (
    <Page title="User - Dashboard">

      <Box className="flex justify-center m-auto bg-white">
        <SideNavigation tabs={tabs} selectedTab={"MARKETPLACE"} />
        <Box className="flex-1 pt-5 px-5 border-r-[1px] pl-[16.25rem] flex justify-center items-start min-h-screen">
          <Box className="max-w-6xl w-full h-full">
            <AppHeader />
            <AppRoutes SiteMap={SiteMap.Dashboard.children ?? {}} />
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Dashboard;
