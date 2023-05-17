import { InventoryItem } from "../../../../../../../../types";

export interface MarketPlaceUnitProps {
    item: InventoryItem;
    onEdit?: (item: InventoryItem) => void;
    onDelete?: (item: InventoryItem) => void;
}