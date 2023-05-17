import React from 'react'
import {
    Card,
    CardContent,
    Box,
    Avatar,
    Typography,
    IconButton,
    Chip,
    Grid,
} from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { UserProps } from './index.types';
import BlockIcon from '@mui/icons-material/Block';
import { AccountStatus } from '../../../../../../types';
import { formatTimeForLastMessage } from '../../../../../../utils/time';

// user info + suspend icon button

const User: React.FC<UserProps> = ({ user }) => {

    const handleBlockUser = () => {
        console.log("Block user");
    }

    return (
        <Card variant="outlined" className="pt-1 cursor-pointer mb-3">
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <Box className="flex justify-center items-center">
                            <Avatar
                                src={user.photo}
                                alt={user.name}
                                sx={{ width: 56, height: 56 }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" fontWeight="bold">
                            {user.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="body1" className="text-gray-600">
                            <Typography variant="overline" fontWeight="bold">Email</Typography>{" "}
                            {user.email}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Typography variant="body1" className="text-gray-600">
                            <Typography variant="overline" fontWeight="bold">Status</Typography>{" "}
                            <Chip label={user.status} />
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Typography variant="body1" className="text-gray-600">
                            <Typography variant="overline" fontWeight="bold">Joined</Typography>{" "}
                            {formatTimeForLastMessage(user.createdAt!)}
                        </Typography>
                    </Grid>

                    {
                        user.status === AccountStatus.ACTIVE && (
                            <Grid item xs={12} md={1}>
                                <IconButton onClick={handleBlockUser}>
                                    <BlockIcon />
                                </IconButton>
                            </Grid>
                        )
                    }
                </Grid>
            </CardContent>
        </Card >
    )
}

export default User