import React from 'react'
import { Box, Grid, Chip, Typography, Rating, Avatar, Modal, Input, InputLabel, Select } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { InventoryItem, InventoryType } from '../../../../../../types';
import InventoryItemModal from './components/InventoryItemModal';



const AddInventoryItem = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [item, setItem] = React.useState<InventoryItem>({
    _id: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    photo: "",
    margin: 0,
    ratings: [],
    description: "",
    market_price: 0,
    cost_price: 0,
    quantity: 1,
    minimum_age: 18,
    inventory_type: InventoryType.VIDEO_GAME,
  })

  const handleAddItem = async() => {
    const url = `${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${item.inventory_type === "video_game" ? "video-games" : "gaming-gears"}`
    let body
    if (item.inventory_type === "video_game") {
      body = {
        quantity: item.quantity,
        title: item.title,
        market_price: item.market_price,
        cost_price: item.cost_price,
        minimum_age: item.minimum_age,
        publisher: item.publisher,
        photo: item.photo
      }
    } else {
      body = {
        quantity: item.quantity,
        title: item.title,
        market_price: item.market_price,
        cost_price: item.cost_price,
        minimum_age: item.minimum_age,
        manufacturer: item.manufacturer,
        photo: item.photo
      }
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(body)
    })

    if (res.ok) {
      const data = await res.json()
      console.log(data)
    }
    

    setModalOpen(false)
    window.location.reload()
  }

  return (
    <>
      <Box className="border-[1px] border-gray-200 rounded-md p-3 flex flex-col justify-center items-center cursor-pointer h-full w-full" onClick={() => setModalOpen(true)}>
        <AddIcon fontSize="large" />
        <Typography variant="body2" className="text-gray-500">
          Add Inventory Item
        </Typography>
      </Box>
      {
        modalOpen && (
          <Box className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <InventoryItemModal
              item={item}
              action='add'
              onChange={setItem}
              onSubmit={handleAddItem}
              onClose={() => setModalOpen(false)}
              modalOpen={modalOpen}
            />
          </Box>
        )
      }
    </>
  )
}

export default AddInventoryItem