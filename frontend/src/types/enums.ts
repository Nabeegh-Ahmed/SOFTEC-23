export enum AccountStatus {
    ACTIVE = 'active',
    SUSPENDED = 'suspended'
}

export enum AccountRole {
    ADMIN = 'admin',
    USER = 'user'
}


export enum AccountGender {
    MALE = 'M',
    FEMALE = 'F',
    OTHER = 'O'
}

export enum InventoryType {
    VIDEO_GAME = 'video_game',
    GAMING_GEAR = 'gaming_gear',
}


export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}


export enum DisputeStatus {
    PENDING = 'pending',
    RESOLVED = 'resolved',
    CLOSED = 'closed'
}