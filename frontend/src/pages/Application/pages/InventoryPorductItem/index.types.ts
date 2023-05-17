import { InventoryItem } from "../../../../types";

export interface InventoryProductItemProps {
    item: InventoryItem;
    onEdit: (item: InventoryItem) => void;
    onDelete: (item: InventoryItem) => void;
}