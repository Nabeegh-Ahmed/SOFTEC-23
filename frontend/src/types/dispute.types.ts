import { DisputeStatus } from "./enums";
import { Order } from "./order.types";
import { User } from "./user.types";


export interface DisputeMessage {
    _id?: string;
    message: string;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
}

export interface Dispute {
    _id?: string;
    title: string;
    admin: User;
    status?: DisputeStatus;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
    messages?: DisputeMessage[];
}
