import React from 'react'
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Input,
  IconButton,
} from "@mui/material";
import { InventoryItem, InventoryType } from '../../../../../../types';
import { MarketplaceProps } from './index.types';
import MarketPlaceUnit from './components/MarketPlaceUnit';
import { useSearchParams } from 'react-router-dom';


const MarketPlace: React.FC<MarketplaceProps> = ({ videoGames, gamingGear }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")
  return (
    <Box className="mt-10">
      {/* section title */}
      <Typography variant="h5" fontWeight="bold">
        MarketPlace
      </Typography>
      <Typography variant="body1" className="text-gray-500">
        Find your desired gaming video and gaming gears here.
      </Typography>

      <Typography variant="h6" fontWeight={"bold"}>
        Video Games
      </Typography>

      <Grid container spacing={2} className='mb-5'>
        {videoGames.map((item) => {
          if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null
          }
          return (
            <Grid item xs={12} md={3} key={item._id + item.title} >
              <MarketPlaceUnit
                item={item}
                onEdit={() => { }}
                onDelete={() => { }}
              />
            </Grid>
          )
        })}
      </Grid>
      {
        videoGames.length === 0 && (
          <Typography variant="body1" className="text-gray-500">
            No Video Games Found
          </Typography>
        )
      }

      <Typography variant="h6" fontWeight={"bold"}>
        Gaming Gear
      </Typography>

      <Grid container spacing={2} className='mb-5'>
        {gamingGear.map((item) => {
          if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null
          }
          return (
            <Grid item xs={12} md={3} key={item._id + item.title} >
              <MarketPlaceUnit
                item={item}
                onEdit={() => { }}
                onDelete={() => { }}
              />
            </Grid>
          )
        })}
      </Grid>
      {
        gamingGear.length === 0 && (
          <Typography variant="body1" className="text-gray-500">
            No Gaming Gear Found
          </Typography>
        )
      }
    </Box>
  )
}

export default MarketPlace