import { InventoryItem } from "../../types";
import { OrderItem } from "../../types/order.types";
import { Actions, ICartState } from "./types";

export const initialCartState: ICartState = {
    items: []
}

export const cartReducer = (state: ICartState, action: Actions): ICartState => {
    switch (action.type) {
        case "INIT_CART":
            return {
                ...state,
                items: action.payload
            }

        case "ADD_TO_CART": {
            console.log("CART ADD")
            const { item } = action.payload;
            const items = [...state.items];
            const itemIndex = items.findIndex((i: OrderItem) => i.item_id === item._id);
            if (itemIndex === -1) {
                items.push({
                    item: item,
                    quantity: 1,
                    item_id: item._id,
                    market_price: item.market_price
                });
            } else {
                items[itemIndex].quantity += 1;
            }
            localStorage.setItem("cart", JSON.stringify({items: items}))
            return {
                ...state,
                items
            }
        }

        case "REMOVE_FROM_CART": {
            const { item } = action.payload;
            const items = [...state.items];
            const itemIndex = items.findIndex((i: OrderItem) => i.item_id === item.item_id);
            if (itemIndex !== -1) {
                if (items[itemIndex].quantity - 1 === 0) {
                    items.splice(itemIndex, 1);
                } else {
                    items[itemIndex].quantity -= 1;
                }
            }
            return {
                ...state,
                items
            }
        }

        default: {
            return state
        }
    }
}