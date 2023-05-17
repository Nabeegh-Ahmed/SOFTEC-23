import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, Chip, Typography, Rating, Avatar } from "@mui/material";
import { InventoryItemReviewListProps } from './index.types';
import { formatTimeForLastMessage } from '../../../../../../utils/time';
import AddReview from './components/AddReview';
import { InventoryItemReview } from '../../../../../../types';
import { UserContext } from '../../../../../../contexts/UserContext';


const InventoryItemReviewList: React.FC<InventoryItemReviewListProps> = ({ reviews, item }) => {
    const { state } = useContext(UserContext)
    const [canReview, setCanReview] = useState(false)
    
    const getOrders = async () => {
        const url = `${import.meta.env.VITE_URL || "http://localhost:8000"}/api/orders/user`
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        // const id = typeof item.item === "string" ? item.item : item.item._id
        
        
        const data = await res.json()
        data.data.map((order: any) => {
            order.items.map((orderItem: any) => {
                console.log(orderItem, item)
                if (orderItem.item === item?._id.toString()) {
                    setCanReview(true)
                }
            })
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    const handleAddReview = (review: InventoryItemReview) => {
        const addReview = async () => {
            const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory-ratings/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({
                    rating: review.rating,
                    comment: review.comment,
                    item: item?._id.toString(),
                    itemType: item?.inventory_type
                })
            })
            if (res.ok) {
                const data = await res.json()
                window.location.reload()
            }
        }
        addReview().then()
    }

    return (
        <Box className="mt-5">
            <Typography variant="h6" fontWeight="bold" className="text-gray-600">
                Reviews
            </Typography>

            <Box className="mt-2">
                {reviews.map((review, index) => (
                    <Box key={index} className="border-[1px] border-gray-200 rounded-md p-3 mt-2">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="flex flex-col justify-between">
                                <Box className="flex items-center">
                                    <Avatar src={review.user?.photo} alt="" />
                                    <Box className="ml-2">
                                        <Typography variant="body2" fontWeight="bold" className="text-gray-600">
                                            {review.user?.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-500">
                                            {review.user?.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box className="mt-2">
                                    <Rating name="read-only" value={review.rating} readOnly />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={12} className="flex flex-col justify-between">
                                <Typography variant="body2" className="text-gray-500">
                                    {review.comment}
                                </Typography>

                                <Box className="mt-2">
                                    <Typography variant="body2" className="text-gray-500">
                                        {formatTimeForLastMessage(review?.createdAt!)}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>

            <AddReview onAddReview={handleAddReview} />


        </Box>
    )
}

export default InventoryItemReviewList