import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, Chip, Typography } from "@mui/material";
import { inventory } from '../../../../data/inventory';
import { useParams } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import CustomButton from '../../../../components/CustomButton';
import { formatTimeForLastMessage } from '../../../../utils/time';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryItemReviewList from './components/InventoryItemReviewList';
import { useDispatch } from 'react-redux';
import { InventoryItem } from '../../../../types';
import { CartContext } from '../../../../contexts/CartContext';
import { UserContext } from '../../../../contexts/UserContext';
import { ToastContainer, toast } from 'react-toastify';

const InventoryProductItem = () => {
    const params = useParams<{ id: string, type: string }>();
    const id = params.id, variant = params.type;
    const [item, setItem] = useState<InventoryItem>(inventory[0])

    const { dispatch } = useContext(CartContext)
    const { state } = useContext(UserContext)
    const notify = () => toast("Product added to cart")
    useEffect(() => {
        const fetchProductDetails = async () => {
            const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${variant}/${id}`)
            if (res.ok) {
                const data = await res.json()
                setItem(data.data)
            }
        }
        fetchProductDetails().then()
    }, [])

    const handleAddToCart = (e: any) => {
        e.preventDefault()
        dispatch({ type: "ADD_TO_CART", payload: { item } })
        notify()
    }

    if (!item) return <></>

    return (
        <Box className="max-h-screen">
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
            <Grid container className="mt-5">
                <Box className="p-5 border-[1px] rounded-md">
                    <Grid container spacing={4}>

                        {/* LEFT SIDE */}
                        <Grid item xs={12} md={7}>
                            {/* Image with favourite icon at the bottom */}
                            <Box className="relative">
                                {
                                    state.user?.role !== "admin" && (
                                        <Box className="absolute bottom-0 right-0 p-2">
                                            <FavoriteBorderIcon className="text-gray-500" />
                                        </Box>
                                    )
                                }
                                <img src={item.photo} alt="" className="w-full h-full object-cover rounded-md" />
                            </Box>
                        </Grid>

                        {/* RIGHT SIDE */}
                        <Grid item xs={12} md={5}>
                            {/* Porduct Information With rating (1-5), Cart Button With Icon */}

                            <Box className="mt-4">
                                <Typography variant="body1" fontWeight="bold" className="text-gray-600">
                                    {item.title}
                                </Typography>

                                <Typography variant="body2" className="text-gray-500">
                                    {item.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos consequuntur iste earum, rem veritatis eum aperiam in sint officiis optio dolorem quo sit error. Esse neque perferendis ratione dolorum sed?"} 
                                </Typography>

                                <Box className="mt-2">
                                    <Typography variant="h5" fontWeight="bold">
                                        <Typography variant="overline" fontWeight="bold">PKR</Typography>{" "}
                                        {item.market_price}
                                    </Typography>

                                    {/* Use chips, colors, and icons to display the information */}
                                    <Box className="mt-2">

                                        {/* Quantity: number here in bold in same line */}
                                        <Typography variant="body2" className="text-gray-500">
                                            Quantity: <Typography variant="body2" fontWeight="bold" className="inline">{item.quantity}</Typography>
                                        </Typography>


                                        {/* Minimum Age: number here in bold in same line */}
                                        <Typography variant="body2" className="text-gray-500">
                                            Minimum Age: <Typography variant="body2" fontWeight="bold" className="inline">{item.minimum_age}</Typography>
                                        </Typography>

                                        {/* Publiched At: date here in bold in same line */}
                                        <Typography variant="body2" className="text-gray-500">
                                            {/* No whitespace wrap */}
                                            Published At: <Typography variant="body2" fontWeight="bold" className="inline">{formatTimeForLastMessage(item?.createdAt!)}</Typography>
                                        </Typography>


                                        <Box className="mt-2">
                                            <Chip label={item.inventory_type} color="primary" className="mr-2" />
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Cart Button */}
                                {
                                    state.user?.role !== "admin" && (
                                        <Box className="mt-10">
                                            <CustomButton
                                                variant="contained"
                                                type="submit"
                                                fullWidth
                                                size="large"
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart <EastIcon />
                                            </CustomButton>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box className="mt-2">
                                <InventoryItemReviewList reviews={item.ratings} item={item} />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Box>
    )
}

export default InventoryProductItem