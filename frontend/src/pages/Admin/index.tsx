import Page from "../../components/Page";
import { Box, Grid } from "@mui/material";
import AppRoutes from "../../routing";
import SiteMap from "../../routing/Sitemap";
import SideNavigation from "../Application/components/SideNavigation";
import AppHeader from "../Application/components/AppHeader";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const tabs = {
    INVENTORY: {
        name: "Inventory",
        iconSrc: "/icons/Category.svg",
        to: SiteMap.Admin.children?.Home?.relativePath,
    },
    USERS: {
        name: "Users",
        iconSrc: "/icons/user_1.svg",
        to: SiteMap.Admin.children?.Users?.relativePath,
    },
    ORDERS: {
        name: "Orders",
        iconSrc: "/icons/file-text_delete.svg",
        to: SiteMap.Admin.children?.Orders?.relativePath,
    },
    DISPUTES: {
        name: "Disputes",
        iconSrc: "/icons/file-text_delete.svg",
        to: SiteMap.Admin.children?.Disputes?.relativePath,
    },
}


const Dashboard = () => {
    const {state} = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (state.user?.role !== "admin") {
            navigate("/")
        }
    }, [])
    return (
        <Page title="Admin - Dashboard">

            <Box className="flex justify-center m-auto bg-white">
                <SideNavigation tabs={tabs} selectedTab="INVENTORY" />
                <Box className="flex-1 pt-5 px-5 border-r-[1px] pl-[16.25rem] flex justify-center items-start min-h-screen">
                    <Box className="max-w-6xl w-full h-full">
                        <AppHeader />
                        <AppRoutes SiteMap={SiteMap.Admin.children ?? {}} />
                    </Box>
                </Box>
            </Box>
        </Page>
    );
};

export default Dashboard;
