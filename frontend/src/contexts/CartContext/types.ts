import { OrderItem } from "../../types/order.types";

export interface ICartState {
    items: OrderItem[];
}

export type ActionType =
    "INIT_CART" | "ADD_TO_CART" | "REMOVE_FROM_CART"

export type Actions = {
    type: ActionType,
    payload: any
}