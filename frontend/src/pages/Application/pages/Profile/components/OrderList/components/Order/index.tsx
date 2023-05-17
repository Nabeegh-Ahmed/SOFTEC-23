import React from 'react'
import {
    Card,
    CardContent,
    Box,
    Avatar,
    Typography,
    IconButton,
    Chip
} from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { OrderProps } from './index.types';
import { formatTimeForLastMessage } from '../../../../../../../../utils/time';
import OrderItem from './compponents/OrderItem';
import { abbreviateCurrency } from '../../../../../../../../utils/currency';

const Order: React.FC<OrderProps> = ({ order, isCart = false }) => {
    const [expanded, setExpanded] = React.useState<boolean>(isCart || false);
    const orderTotal = () => {
        let total = 0;
        order.items?.forEach((orderItem) => {
            total += orderItem.market_price || 0 * orderItem.quantity;
        });
        return total;
    }

    return (
        <Card variant="outlined" className="pt-1 cursor-pointer">
            <CardContent>

                {
                    !isCart && (
                        <Box className="flex justify-between items-center">
                            <Typography variant="body1" className="text-gray-600">
                                <Typography variant="overline" fontWeight="bold">Order ID</Typography>{" "}
                                {order._id}
                            </Typography>

                            <Typography variant="body1" className="text-gray-600">
                                <Typography variant="overline" fontWeight="bold">Order Total</Typography>{" "}
                                {abbreviateCurrency(orderTotal())} PKR
                            </Typography>

                            <Typography variant="body1" className="text-gray-600">
                                <Typography variant="overline" fontWeight="bold">Order Status</Typography>{" "}
                                <Chip label={order.status} />
                            </Typography>

                            <Typography variant="body1" className="text-gray-600">
                                <Typography variant="overline" fontWeight="bold">Order Date</Typography>{" "}
                                {formatTimeForLastMessage(order.createdAt!)}
                            </Typography>

                            <IconButton onClick={() => setExpanded(!expanded)}>
                                <BiChevronDown />
                            </IconButton>
                        </Box>
                    )
                }
                {
                    expanded && (
                        <Box className="mt-5">
                            {
                                order.items?.map((orderItem, index) => (
                                    <OrderItem key={index} orderItem={orderItem} />
                                ))
                            }
                        </Box>
                    )
                }

            </CardContent>
        </Card>
    )
}

export default Order