import React from 'react'
import {
    Avatar,
    Box,
    Grid,
    Typography,
    Input,
    IconButton,
} from "@mui/material";
import { DisputeMessageListProps } from './index.types';
import { formatTimeForLastMessage } from '../../../../../../utils/time';

// export interface DisputeMessage {
//     _id?: string;
//     message: string;
//     createdAt?: string;
//     updatedAt?: string;
//     user?: User;
// }


// display user info with avatar
// also display message with timestamp


const DisputeMessageList: React.FC<DisputeMessageListProps> = ({ messages }) => {
    return (
        <Box sx={{ mt: 2 }}>
            {
                messages.map((message, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }} className="flex items-center">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="flex flex-col justify-between">

                                <Box className="flex items-center">
                                    <Avatar src={message.user?.photo} alt="" />
                                    <Box className="ml-2">
                                        <Typography variant="body2" fontWeight="bold" className="text-gray-600">
                                            {message.user?.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-500">
                                            {message.user?.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={12} className="flex flex-col justify-between">
                                <Typography variant="caption" component="p" className="text-gray-500">
                                    {formatTimeForLastMessage(message.createdAt!)}
                                </Typography>

                                <Typography variant="body1" component="p" className="text-gray-600">
                                    {message.message}
                                </Typography>
                            </Grid>
                        </Grid>

                    </Box>
                ))
            }
        </Box>
    )
}

export default DisputeMessageList