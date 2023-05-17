import { AccountGender, AccountRole, AccountStatus, User } from "../../types";

export const users: User[] = [
    {
        _id: "1",
        name: "Farhan Ali",
        bio: "Passionate about #webdevelopment and #coding. I am a #fullstack developer.",
        email: "hifarhanli@gmail.com",
        photo: "https://pbs.twimg.com/profile_images/1610739084422701056/ULlxAGzF_400x400.jpg",
        coverphoto: "https://pbs.twimg.com/profile_banners/1542832727736651777/1672868351/1500x500",
        isVerified: true,
        gender: AccountGender.MALE,
        status: AccountStatus.ACTIVE,
        role: AccountRole.USER,
        createdAt: "2021-10-10T00:00:00.000Z",
        updatedAt: "2021-10-10T00:00:00.000Z"
    },
    {
        _id: "2",
        name: "Saqib",
        bio: "Passionate about #webdevelopment and #coding. I am a #fullstack developer.",
        email: "saqib@gmail.com",
        photo: "/public/avatars/saqib.jpeg",
        gender: AccountGender.MALE,
        status: AccountStatus.ACTIVE,
        role: AccountRole.USER,
        createdAt: "2021-10-10T00:00:00.000Z",
        updatedAt: "2021-10-10T00:00:00.000Z"
    },
    {
        _id: "3",
        name: "Nabeegh Ahmed",
        bio: "Passionate about #webdevelopment and #coding. I am a #fullstack developer.",
        email: "nabeegh@gmail.com",
        photo: "https://pbs.twimg.com/profile_images/1586419233839370240/rYrRPVOw_400x400.jpg",
        coverphoto: "https://pbs.twimg.com/profile_images/1586419233839370240/rYrRPVOw_400x400.jpg",
        gender: AccountGender.MALE,
        status: AccountStatus.ACTIVE,
        role: AccountRole.USER,
        createdAt: "2021-10-10T00:00:00.000Z",
        updatedAt: "2021-10-10T00:00:00.000Z"
    }
]