import React, { useContext, useEffect } from 'react'
import { Box } from "@mui/material";
import Order from '../Profile/components/OrderList/components/Order';
import { CartContext } from '../../../../contexts/CartContext';
import CustomButton from '../../../../components/CustomButton';
import { Link } from 'react-router-dom';
import SiteMap from '../../../../routing/Sitemap';

const Cart = () => {
    const { state } = useContext(CartContext)
    return (
        <Link to={SiteMap.Dashboard?.children?.Order.relativePath!}>
            <Box className="p-5 border-[1px] rounded-md">
                <Order order={state} isCart={true} />
                <CustomButton
                    variant="contained"
                    type="submit"
                    fullWidth
                    size="large"
                    className='mt-4'
                    style={{ marginTop: "12px" }}
                >
                    Order
                </CustomButton>
            </Box>
        </Link>
    )
}

export default Cart