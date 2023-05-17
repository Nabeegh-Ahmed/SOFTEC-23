import React, { Dispatch, useEffect, useState } from 'react'
import {
    Typography,
    Grid,
    Stack,
    Box,
    Button,
    IconButton,
} from "@mui/material";
import MarketPlaceUnit from '../../../Application/pages/Home/components/MarketPlace/components/MarketPlaceUnit';
import AddInventoryItem from './components/AddInventoryItem';
import InventoryItemModal from './components/AddInventoryItem/components/InventoryItemModal';
import { InventoryItem } from '../../../../types';
import { useSearchParams } from 'react-router-dom';

const AdminInventory = () => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [editedItem, setEditedItem] = React.useState<InventoryItem | null>(null)

    const [videoGames, setVideoGames] = useState([])
    const [gamingGear, setGamingGear] = useState([])

    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get("search")

    useEffect(() => {
        const fetchInventoryItem = async (variant: string, setter: Dispatch<any>) => {
            const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${variant}`)
            if (res.ok) {
                const data = await res.json()
                console.log(variant, data)
                setter(data.data)
            }
        }
        Promise.all([fetchInventoryItem("video-games", setVideoGames), fetchInventoryItem("gaming-gears", setGamingGear)])
    }, [])
    const handleEditItem = async () => {
        const url = `${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${editedItem?.inventory_type === "video_game" ? "video-games" : "gaming-gears"}/${editedItem?._id}`
        let body
        if (editedItem?.inventory_type === "video_game") {
            body = {
                quantity: editedItem.quantity,
                title: editedItem.title,
                market_price: editedItem.market_price,
                cost_price: editedItem.cost_price,
                minimum_age: editedItem.minimum_age,
                publisher: editedItem.publisher,
                photo: editedItem.photo
            }
        } else {
            body = {
                quantity: editedItem?.quantity,
                title: editedItem?.title,
                market_price: editedItem?.market_price,
                cost_price: editedItem?.cost_price,
                minimum_age: editedItem?.minimum_age,
                manufacturer: editedItem?.manufacturer,
                photo: editedItem?.photo
            }
        }
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(body)
        })

        if (res.ok) {
            window.location.reload()
        }

        setModalOpen(false)
    }

    const handleDelete = (item: InventoryItem) => {
        const url = `${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${item?.inventory_type === "video_game" ? "video-games" : "gaming-gears"}/${item?._id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    const data = res.json()
                    if (item.inventory_type === "video_game") {
                        setVideoGames(videoGames.filter((game: any) => game._id !== item._id))
                    } else {
                        setGamingGear(gamingGear.filter((game: any) => game._id !== item._id))
                    }
                }
            })
    }

    return (
        <>
            <Box className="mt-10">
                {/* section title */}
                <Typography variant="h5" fontWeight="bold">
                    Inventory
                </Typography>
                <Typography variant="body1" className="text-gray-500">
                    Manage your inventory
                </Typography>

                <Typography variant="h6" className="text-gray-500">
                    Gaming Gear
                </Typography>
                <Grid container spacing={2} className="pt-5">
                    {gamingGear.map((item: InventoryItem) => {
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
                    <Grid item xs={12} md={3} >
                        <AddInventoryItem />
                    </Grid>
                </Grid>

                <Typography variant="h6" className="text-gray-500">
                    Video Games
                </Typography>
                <Grid container spacing={2} className="pt-5">
                    {videoGames.map((item: InventoryItem) => {
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
                    <Grid item xs={12} md={3} >
                        <AddInventoryItem />
                    </Grid>
                </Grid>
            </Box>
            {
                modalOpen && editedItem && (
                    <Box className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <InventoryItemModal
                            item={editedItem!}
                            action='edit'
                            onChange={setEditedItem}
                            onSubmit={handleEditItem}
                            onClose={() => setModalOpen(false)}
                            modalOpen={modalOpen}
                        />
                    </Box>
                )
            }
        </>
    )
}

export default AdminInventory