import React, { useEffect, useState } from 'react'
import OrderList from '../../../Application/pages/Profile/components/OrderList'
import { orders } from '../../../../data/orders'

const AllOrders = () => {
    const [orders, setOrders] = useState<any>()
    const fetchOrders = async() => {
        const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
        if (res.ok) {
            const data = await res.json()
            setOrders(data.data)
        }
    }
    useEffect(() => {
        fetchOrders().then()
    }, [])
    return (
        <OrderList orders={orders??[]} />
    )
}

export default AllOrders