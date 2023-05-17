/* USER */
export enum AccountRole {
    ADMIN = 'admin',
    USER = 'user'
}

export enum AccountStatus {
    ACTIVE = 'active',
    SUSPENDED = 'suspended'
}

export enum AccountProvider {
    LOCAL = 'local',
    GOOGLE = 'google'
}

export enum Gender { 
    MALE = 'M',
    FEMALE = 'F'
}

export enum UserPhoneNumberStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    CANCELLED = 'cancelled',
}

export enum UserOTPStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    CANCELLED = 'cancelled',
}

export enum SortOrder {
    ASC = 1,
    DESC = -1
}




/* CONTRACT */
export enum ContractPaymentStatus {
    VERIFIEID = 'verified',
    UNVERIFIED = 'unverified',
    REJECTED = 'rejected'
}
export enum ContractStatus {
    DRAFTED = 'drafted',
    PUBLISHED = 'published',
    IN_PROGRESS = 'in_progress',
    DELIVERED = 'delivered',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}
export enum ContractInvitationStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}


/* INVENTORY */ 
export enum InventoryType {
    VIDEO_GAME = 'video_game',
    GAMING_GEAR = 'gaming_gear'
}