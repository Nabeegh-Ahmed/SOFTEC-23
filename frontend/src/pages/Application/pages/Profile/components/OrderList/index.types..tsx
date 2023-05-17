import { Order } from "../../../../../../types/order.types";

export interface OrderListProps {
    orders: Order[];
    title?: string;
}