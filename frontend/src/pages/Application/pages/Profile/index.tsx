import { Box, Grid } from "@mui/material";
import ProfileAbout from "./components/ProfileAbout";
import ProfileRecentFeedback from "./components/ProfileRecentFeedback";
import ProfileRecentContracts from "./components/ProfileRecentContracts";
import ProfileHeader from "./components/ProfileHeader";
import { useContext, useEffect, useState } from "react";

import OrderList from "./components/OrderList";
import { orders } from "../../../../data/orders";
import CustomButton from "../../../../components/CustomButton";
import { UserContext } from "../../../../contexts/UserContext";

const Profile = () => {

  const [orders, setOrders] = useState([])
  const {state} = useContext(UserContext)
  const getOrders = async () => {
    const url = `${import.meta.env.VITE_URL || "http://localhost:8000"}/api/orders/user`
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    const data = await res.json()
    setOrders(data.data)
  }

  useEffect(() => {
    getOrders().then()
  }, [])

  return (
    <Box>
      {/* @ts-ignore */}
      <ProfileHeader user={state.user!} />

      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <ProfileAbout />
        </Grid>
        <Grid item xs={12} lg={9}>
          <ProfileRecentFeedback />

        </Grid>


      </Grid>

      {/* <ProfileRecentContracts /> */}
      <OrderList orders={orders} />
    </Box>
  );
};

export default Profile;
