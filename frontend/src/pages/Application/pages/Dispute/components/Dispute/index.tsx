import React from 'react'
import {
    Avatar,
    Box,
    Grid,
    Typography,
    Input,
    IconButton,
} from "@mui/material";
import { DisputeProps } from './index.types';
import DisputeMessageList from '../DisputeMessageList';
import SendIcon from '@mui/icons-material/Send';
const Dispute: React.FC<DisputeProps> = ({ dispute }) => {

    const [message, setMessage] = React.useState<string>("")

    const handleSendMessage = () => {
        if (!message.trim()) return
        console.log("handleSendMessage", message)
        const sendMessage = async () => {
            const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/dispute-messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({
                    message: message,
                    dispute: dispute._id
                })
            })
            if (res.ok) {
                const data = await res.json()
                setMessage("")
                window.location.reload()
            }
        }
        sendMessage().then()
    }

    return (
        <Box>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h1">
                        {dispute.title}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <DisputeMessageList messages={dispute.messages || []} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Input
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            fullWidth
                            disableUnderline
                            sx={{ mr: 2 }}
                        />
                        <IconButton onClick={handleSendMessage}>
                            <Typography variant="body1" component="span">
                                <SendIcon />
                            </Typography>
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dispute