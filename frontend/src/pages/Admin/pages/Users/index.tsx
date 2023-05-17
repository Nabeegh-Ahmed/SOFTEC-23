import React, { useEffect, useState } from 'react'
import {
    Typography,
    Grid,
    Stack,
    Box,
    Button,
    IconButton,
} from "@mui/material";
import { users } from '../../../../data/users';
import User from './components/User';

const Users = () => {
    const [userList, setUserList] = useState<any>()
    const fetchUsers = async() => {
        const url = `${import.meta.env.VITE_URL || "http://localhost:8000"}/api/users`
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })
        const data = await res.json()
        setUserList(data.data)
    }
    useEffect(() => {
        fetchUsers().then()
    }, [])
    return (
        <Box className="min-h-screen mt-5 p-5 px-6 border-[1px] border-gray-200 rounded-md flex gap-5 flex-col">
            <Typography variant="h5" fontWeight="bold">
                All Users
            </Typography>
            <Grid container className="mt-5">
                <Grid item xs={12} spacing={4}>
                    {
                        userList?.map((user: any) => (
                            <User user={user} key={user._id} />
                        ))
                    }
                </Grid>
            </Grid>
        </Box >
    )
}

export default Users