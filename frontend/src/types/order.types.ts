import { OrderStatus } from "./enums";
import { InventoryItem } from "./inventory.types";
import { User } from "./user.types";

export interface OrderItem {
    item?: InventoryItem;
    item_id?: string;
    quantity: number;
    market_price?: number;
}

export interface Order {
    _id?: string;
    items?: OrderItem[];
    user?: User;
    status?: OrderStatus;
    createdAt?: string;
    updatedAt?: string;
}