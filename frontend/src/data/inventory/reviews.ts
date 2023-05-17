import { InventoryItemReview } from "../../types";
import { users } from "../users";

export const productReviews: InventoryItemReview[] = [
    {
        _id: "1",
        user: users[0],
        rating: 4,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: "2021-09-20T12:00:00.000Z"
    },
    {
        _id: "2",
        user: users[1],
        rating: 5,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        createdAt: "2021-09-20T12:00:00.000Z"
    }
]