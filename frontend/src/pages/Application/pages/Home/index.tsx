import { Box } from "@mui/material";
import Statistics from "./components/Statistics";
import Greetings from "./components/Greetings";
import MarketPlace from "./components/MarketPlace";

import { Dispatch, useEffect, useState } from "react";
import { InventoryItem, InventoryType } from "../../../../types";
import { useSearchParams } from "react-router-dom"

const DashboardHome = () => {
  const [videoGames, setVideoGames] = useState<InventoryItem[]>([])
  const [gamingGear, setGamingGear] = useState<InventoryItem[]>([])
  // get url queries
  
  
  useEffect(() => {
    const fetchInventoryItem = async (variant: string, setter: Dispatch<any>) => {
      const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${variant}`)
      if (res.ok) {
        const data = await res.json()
        setter(data.data)
      }
    }
    Promise.all([fetchInventoryItem("video-games", setVideoGames), fetchInventoryItem("gaming-gears", setGamingGear)])
  }, [])

  return (
    <Box>
      <Greetings />
      {/* <Statistics /> */}
      <MarketPlace videoGames={videoGames} gamingGear={gamingGear} />
      {/* <ActiveContracts /> */}
    </Box>
  );
};

export default DashboardHome;
