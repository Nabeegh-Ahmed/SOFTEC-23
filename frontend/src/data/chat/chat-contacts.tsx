
import { ChatContact, User } from "../../types";

import { users } from "../users";
import { conversations } from "./conversations";

const me: User = users[0]
const saqib: User = users[1]
const nabeegh: User = users[2]

export const chatContacts: ChatContact[] = [
    {
        _id: "1",
        user: saqib,
        online: true,
        lastMessage: conversations[0].messages[conversations[0].messages.length - 1],
        read: true,
    },
    {
        _id: "2",
        user: nabeegh,
        online: false,
        lastMessage: conversations[1].messages[conversations[1].messages.length - 1],
        read: false,
    },
]