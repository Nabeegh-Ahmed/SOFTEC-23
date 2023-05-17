import { InventoryItem, InventoryItemReview } from "../../../../../../../../types";

export interface AddReviewProps {
    onAddReview: (review: InventoryItemReview) => void;
}