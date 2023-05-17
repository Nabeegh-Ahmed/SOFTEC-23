import { InventoryType } from "./enums";
import { User } from "./user.types";

export interface InventoryItem {
  photo?: string;
  quantity: number;
  title: string;
  description: string;
  market_price: number;
  cost_price: number;
  margin: number;
  inventory_type: InventoryType;
  minimum_age: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  ratings: InventoryItemReview[];
  publisher?: string,
  manufacturer?: string,
}


export interface InventoryItemReview {
  _id?: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User
  item?: InventoryItem
}