import { InventoryItem } from "../../../../../../../../types";

export interface InventoryItemModalProps {
    item: InventoryItem;
    action: "add" | "edit";
    onClose: () => void;
    onSubmit: () => void;
    onChange: (item: InventoryItem) => void;
    modalOpen: boolean;
}