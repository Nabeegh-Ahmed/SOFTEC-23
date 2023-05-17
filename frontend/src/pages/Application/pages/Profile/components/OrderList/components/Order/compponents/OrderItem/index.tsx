import React, { useEffect, useState } from 'react'
import { OrderItemProps } from './index.types'
import { Box, Grid, Chip, Typography, Rating, Avatar } from "@mui/material";
import { abbreviateCurrency } from '../../../../../../../../../../utils/currency';
import SiteMap from '../../../../../../../../../../routing/Sitemap';
import { Link } from 'react-router-dom';

const OrderItem: React.FC<any> = ({ orderItem }) => {
    const [product, setProduct] = useState<any>()
    console.log(orderItem)
    
    const id = typeof orderItem.item === "string" ? orderItem.item : orderItem.item._id
    const itemType = typeof orderItem.item === "string" ? orderItem.itemType : orderItem.item.inventory_type

    const fetchItem = async () => {

        const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/inventory/${itemType.replace("_", "-")}s/${id}`)
        console.log(res)
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setProduct(data.data)
        }
    }
    useEffect(() => {
        fetchItem()
    }, [])
    return (
        <Box className="p-5 border-[1px] rounded-md">
            {/* Product image at left*/}
            {/* Other info at right with rating */}
            {/* @ts-ignore */}

            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Link to={`/app/product/${itemType?.replace("_", "-")}s/${id}`}>
                        <Box className="flex justify-center items-center">
                            <img src={product?.photo} alt={orderItem.item?.title} className="w-full h-full" />
                        </Box>
                    </Link>
                </Grid>


                <Grid item xs={12} lg={8}>
                    <Box className="flex justify-between items-center">
                        <Box>
                            <Typography variant="h6" className="text-gray-600">

                                {product?.title}
                            </Typography>
                            <Typography variant="body1" className="text-gray-600">
                                {product?.description}
                            </Typography>

                            <Typography variant="body1" className="text-gray-600">
                                <Typography variant="overline" fontWeight="bold">Quantity</Typography>{" "}
                                {orderItem.quantity}
                            </Typography>

                            <Typography variant="body1" className="text-gray-600">
                                <Typography variant="overline" fontWeight="bold">Market Price</Typography>{" "}
                                {abbreviateCurrency(orderItem.market_price!)} PKR
                            </Typography>
                        </Box>

                    </Box>
                </Grid>
            </Grid>

        </Box>
    )
}

export default OrderItem