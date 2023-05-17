import React, { useContext } from 'react'
import { OrderListProps } from './index.types.'
import { Box, Grid, Chip, Typography, Rating, Avatar } from "@mui/material";
import Order from './components/Order';
import { OrderStatus } from '../../../../../../types';
import { UserContext } from '../../../../../../contexts/UserContext';

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  let orderCount = 0
  return (
    <Box className="max-h-screen mt-5 p-5 px-6 border-[1px] border-gray-200 rounded-md flex gap-5 flex-col">
      <Typography variant="h5" fontWeight="bold">
        {/* {title} */}
      </Typography>
      <Grid container className="mt-5">
        <Grid container spacing={4}>
          {orders.map((order) => {
            // @ts-ignore
            if (order.status === "PAID") {
              orderCount += 1
              return (
                <Grid item lg={12} key={order._id}>
                  <Order order={order} />
                </Grid>
              )
            }
            
          })}

          {orderCount === 0 && <Grid item lg={12}>No orders yet</Grid>}
          
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderList