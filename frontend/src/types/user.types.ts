import { AccountGender, AccountRole, AccountStatus } from "./enums";
import { Order } from "./order.types";

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export interface User extends AuthTokens {
    _id: string;
    email: string;
    name: string;
    bio?: string;
    photo: string;
    coverphoto?: string;
    isVerified?: boolean;
    dob?: Date;
    gender: AccountGender
    password?: string;
    role?: AccountRole
    orders?: Order[];
    status?: AccountStatus;
    createdAt?: string;
    updatedAt?: string;
}