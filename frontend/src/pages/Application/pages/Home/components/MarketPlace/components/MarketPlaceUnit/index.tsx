import React, { useContext } from 'react'
import {
    Box,
    Typography,
    Input,
    IconButton,
} from "@mui/material";
import { MarketPlaceUnitProps } from './index.types';
import { abbreviateCurrency } from '../../../../../../../../utils/currency';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import SiteMap from '../../../../../../../../routing/Sitemap';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../../../../../../../contexts/UserContext';
import { InventoryItem } from '../../../../../../../../types';
import { ToastContainer, toast } from 'react-toastify';

const MarketPlaceUnit: React.FC<MarketPlaceUnitProps> = ({ item, onEdit, onDelete }) => {
    const { state } = useContext(UserContext)
    const notify = () => toast("Product added to favorite");

    const addFavorite = async (item: InventoryItem) => {
        const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/favorite-products/`, {
            method: "POST",
            body: JSON.stringify({ item: item._id, itemType: item.inventory_type }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        if (res.ok) {
            const data = await res.json()
            notify()

            console.log(data)
        }
    }

    return (
        <Box className="p-5 border-[1px] rounded-md">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Link to={SiteMap.Dashboard.children?.Product.relativePath!.replace(":id", item.inventory_type.replace("_", "-") + "s/" + item._id)!}>

                <Box className="w-full h-40 rounded-md bg-gray-200">
                    <img src={item.photo} alt="" className="w-full h-full object-cover rounded-md" />
                </Box>
            </Link>


            <Box className="mt-4">
                <Typography variant="body1" fontWeight="bold" className="text-gray-600">
                    {item.title}
                </Typography>

                {/* limit description to 4 lines only an dsiplay read more button */}
                <Typography variant="body2" className="text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {item.description}
                </Typography>

                <Box className="mt-2">
                    <Typography variant="h5" fontWeight="bold">
                        <Typography variant="overline" fontWeight="bold">PKR</Typography>{" "}
                        {abbreviateCurrency(item.market_price)}
                    </Typography>

                    <Typography variant="body2" className="text-gray-500">
                        {item.quantity} in stock
                    </Typography>

                    <Typography variant="body2" className="text-gray-500">
                        Minimum age: {item.minimum_age}
                    </Typography>

                    <Box className="mt-2">
                        {/* LEFT SIDE */}
                        {/* + and - button to increase and decrease quntity */}
                        <Box className="flex items-center">
                            {/* <Box className="flex items-center justify-center border-[1px] rounded-md">
                                <IconButton size="small">
                                    <Typography variant="h5" fontWeight="bold">-</Typography>
                                </IconButton>

                                <Input
                                    value={item.quantity}
                                    className="w-12"
                                    inputProps={{
                                        className: "text-center",
                                        style: {
                                            fontSize: 14,
                                            fontWeight: "bold",
                                        },
                                    }}
                                />

                                <IconButton size="small">
                                    <Typography variant="h5" fontWeight="bold">+</Typography>
                                </IconButton>
                            </Box> */}


                            {/* RIGHT SIDE */}
                            {/* Cart Button */}
                            <Box className="flex items-center justify-end flex-1">
                                {
                                    state.user?.role !== "admin" ? (
                                        <>
                                            <IconButton size="small">
                                                {/* <ShoppingCartIcon /> */}
                                            </IconButton>

                                            <IconButton size="small" onClick={() => addFavorite(item)}>
                                                <FavoriteBorderIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton size="small" onClick={() => onEdit!(item)}>
                                                <ModeEditIcon />
                                            </IconButton>

                                            <IconButton size="small" onClick={() => onDelete!(item)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )
                                }
                            </Box>

                        </Box>
                    </Box>

                </Box>

            </Box>
        </Box>

    )
}

export default MarketPlaceUnit;