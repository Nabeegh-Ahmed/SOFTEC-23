import { OrderStatus } from "../../types";
import { Order } from "../../types/order.types";
import { inventory } from "../inventory";
import { users } from "../users";

export const orders: Order[] = [
    {
        _id: "1",
        items: [
            {
                item: inventory[0],
                quantity: 1,
                market_price: 100
            },
            {
                item: inventory[1],
                quantity: 2,
                market_price: 200
            }
        ],
        user: users[0],
        status: OrderStatus.PENDING,
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z"
    },
    {
        _id: "2",
        items: [
            {
                item: inventory[0],
                quantity: 1,
                market_price: 50
            },
            {
                item: inventory[1],
                quantity: 2,
                market_price: 200
            }
        ],
        user: users[0],
        status: OrderStatus.PENDING,
        createdAt: "2021-01-01T00:00:00.000Z",
        updatedAt: "2021-01-01T00:00:00.000Z"
    },
]
