import React from "react";
import { MoreHoriz } from "@mui/icons-material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Input,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChatCardPorps, MessageProps, MessagesContainerProps } from "./index.types";
import { chatContacts, conversations } from "../../../../data/chat";
import { formatTimeForLastMessage } from "../../../../utils/time";

import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import { ChatContact, Conversation } from "../../../../types";
const Chats = () => {

  const [openedChat, setOpenedChat] = React.useState<{
    contact: ChatContact;
    conversation: Conversation;
  } | null>(null)
  const contactClickHandler = (contact: ChatContact) => {
    const conversation = conversations.find(conversation => conversation._id === contact._id)
    if (conversation) {
      setOpenedChat({ contact, conversation })
    }
  }

  return (
    <Box className="max-h-screen">
      <Grid container className="mt-5">
        <Grid item xs={12} lg={3}>
          <ConversationsContainer>
            {
              chatContacts.map((contact, index) => (
                <ChatCard key={index} contact={contact} onClick={contactClickHandler} />
              ))
            }
          </ConversationsContainer>
        </Grid>
        <Grid item xs={12} lg={9}>
          {
            openedChat ? (
              <MessagesContainer conversation={openedChat.conversation} contact={openedChat.contact} />
            ) : (
              <Box className="flex flex-col items-center justify-center h-full">
                <SmsRoundedIcon className="text-gray-500 text-9xl" />
                <Typography className="text-gray-500 mt-5">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )
          }
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chats;

const ConversationsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box className="mt-8">
      <Typography className="text-gray-500">All Conversations</Typography>
      <Box className="mt-5 flex flex-col gap-4 overflow-y-scroll pr-5 pb-5 h-[calc(100vh-10.25rem)]">
        {children}
      </Box>
    </Box>
  );
};

const MessagesContainer: React.FC<MessagesContainerProps> = ({ contact, conversation }) => {
  // const { user } = React.useContext(userAuthContext)

  return (
    <Box className="">
      <Box className="flex justify-between items-center">
        <Box className="flex items-center gap-4 w-full p-2.5 pb-4">
          <Avatar src={contact.user.photo}>S</Avatar>
          <Box>
            <Box component="p" className="text-xl font-bold">
              {contact.user.name}
            </Box>
            <Box component="p" className="text-gray-500 text-xs">
              {contact.online ? "Online" : "Offline"}
            </Box>
          </Box>
        </Box>
        <Box className="flex">
          <IconButton>
            <img
              draggable={false}
              src={contact.user.photo}
              className="w-5 opacity-50"
            />
          </IconButton>
          <IconButton>
            <img
              draggable={false}
              src="/icons/More-horizontal.svg"
              className="w-5 opacity-50"
            />
          </IconButton>
        </Box>
      </Box>

      <Box className="relative">
        <Box className="bg-slate-100 flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-10rem)]">
          {/* messages container */}
          <Box className="w-full pb-20">
            <Box className="flex flex-col py-2.5 px-5">

              {
                // conversation.messages.map((message, index) => (
                // <Message key={index} message={message} sent={message.sender?._id === user?._id} />
                // ))
              }
            </Box>
          </Box>
        </Box>
        <Box className="p-5 bg-slate-100 border-t-2 absolute w-full bottom-0">
          <Input
            placeholder="Type a message"
            disableUnderline
            className="w-full"
            endAdornment={<ChatControls />}
          />
        </Box>
      </Box>
    </Box>
  );
};

const Message: React.FC<MessageProps> = ({ sent = false, message }) => {
  return (
    <Box className={"flex pb-5 " + (sent ? "justify-end" : "justify-start")}>
      <Box>
        <Box
          component="p"
          className={
            "text-gray-700 text-xs p-2 " + (sent ? "text-right" : "text-left")
          }
        >
          {sent ? "You" : message.sender?.name} •{" " + formatTimeForLastMessage(message.createdAt)}
        </Box>
        <Box
          className={
            (sent ? "bg-black text-white" : "bg-gray-200 text-black") +
            " p-3 px-4 rounded-lg relative max-w-md text-sm"
          }
        >
          {message.message}
        </Box>
      </Box>
    </Box>
  );
};

const ChatCard: React.FC<ChatCardPorps> = ({ contact, onClick }) => {
  return (
    <Box className="flex justify-between cursor-pointer" onClick={() => onClick(contact)}>
      <Box className="text-sm flex items-center gap-2">
        <Avatar src={contact.user.photo}>S</Avatar>
        <Box>
          {
            contact.read ? (
              <><Box className="font-semibold text-gray-700 hover:text-black">
                {contact.user.name}
              </Box>
              </>
            ) : (
              <><Box className="font-bold text-gray-700 flex items-center gap-2">
                <Box className="w-2 h-2 bg-red-500 rounded-full"></Box>
                {contact.user.name}
              </Box>
              </>
            )
          }
          <Box className={contact.read ? "text-gray-500" : "font-semibold"}>{contact.lastMessage?.message}</Box>
        </Box>
      </Box>
      <Box className="text-xs text-gray-500 flex flex-col items-end whitespace-nowrap">
        {
          formatTimeForLastMessage(contact.lastMessage?.createdAt!)
        }
      </Box>
    </Box>
  );
};


const ChatControls = () => {
  return (
    <React.Fragment>
      <Box className="flex gap-2">
        <IconButton>
          <img
            draggable={false}
            src="/icons/paperclip.svg"
            className="w-5 opacity-50"
          />
        </IconButton>
        <IconButton>
          <img
            draggable={false}
            src="/icons/Send.svg"
            className="w-5 opacity-50"
          />
        </IconButton>
      </Box>
    </React.Fragment>
  );
};
