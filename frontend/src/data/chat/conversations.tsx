
import { Conversation, User } from "../../types";
import { users } from "../users";

const me: User = users[0]
const saqib: User = users[1]
const nabeegh: User = users[2]


export const conversations: Conversation[] = [
    {
        _id: "1",
        messages: [
            {
                _id: "1",
                message: "E-SIM is the future of mobile phones.",
                createdAt: "2023-04-05T12:00:00.000Z",
                sender: me,
                receiver: saqib,
            },
            {
                _id: "2",
                message: "I agree.",
                createdAt: "2023-05-05T12:00:00.000Z",
                sender: saqib,
                receiver: me,
            },
            {
                _id: "3",
                message: "I have been using it for a while now.",
                createdAt: "2023-05-04T12:00:00.000Z",
                sender: me,
                receiver: saqib,
            }
        ]
    },
    {
        _id: "2",
        messages: [
            {
                _id: "1",
                message: "Kar lya FYP?",
                createdAt: "2020-10-10T12:00:00.000Z",
                sender: nabeegh,
                receiver: me,
            },
            {
                _id: "2",
                message: "Haan kar liya.",
                createdAt: "2020-10-10T12:00:00.000Z",
                sender: me,
                receiver: nabeegh,
            },
            {
                _id: "3",
                message: "Acha hai.",
                createdAt: "2020-10-10T12:00:00.000Z",
                sender: me,
                receiver: nabeegh,
            }
        ]
    }
]