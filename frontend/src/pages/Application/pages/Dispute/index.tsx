import React, { useContext, useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Input,
  IconButton,
  TextField,
} from "@mui/material";
import Dispute from './components/Dispute';
import { DisputeMessage, Dispute as DisputeType } from '../../../../types/dispute.types';
import { users } from '../../../../data/users';
import CustomButton from '../../../../components/CustomButton';
import FormInput from '../../../Authentication/components/FormInput';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../../../contexts/UserContext';




const Disputes = () => {
  const { state } = useContext(UserContext)
  const [disputes, setDisputes] = useState<DisputeType[]>([])
  const notify = () => toast("Dispute created")
  const findDisputes = async () => {
    const url = state.user?.role === "admin" ? "/api/disputes" : `/api/users/${state.user?._id.toString()}`
    const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}${url}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    if (res.ok) {
      const data = await res.json()
      const findDispute = async (id: string) => {
        const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/disputes/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${localStorage.getItem("access_token")}`
          }
        })
        return await res.json()
      }

      let disputes 
      if (state.user?.role === "admin") {
        disputes = await Promise.all(data.data.map((dispute: any) => findDispute(dispute._id)))
      } else {
        disputes = await Promise.all(data.data.disputes.map((id: any) => findDispute(id)))
      }
      
      setDisputes(disputes.map(dispute => dispute.data))
    }
  }
  const openDispute = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/disputes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify({
        title: disputeTitle,
        admin: "6456083fb97335e338e4f589"
      })
    })
    if (res.ok) {
      const data = await res.json()
      notify()
      setDisputeTitle("")
      setDisputes([...disputes, data.data])
    }
  }
  const [disputeTitle, setDisputeTitle] = useState("")
  useEffect(() => {
    findDisputes()
  }, [])
  console.log(disputes)
  return (
    <Box className="min-h-screen mt-5 p-5 px-6 border-[1px] border-gray-200 rounded-md flex gap-5 flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <TextField name='title' label={"Dispute Title"} value={disputeTitle} onChange={(e) => setDisputeTitle(e.target.value)} />

      <CustomButton variant='contained' fullWidth onClick={openDispute}>Open new dispute</CustomButton>
      <Typography variant="h5" fontWeight="bold">
        My Disputes
      </Typography>
      <Grid container className="mt-5">
        <Grid item xs={12} spacing={4}>
          {
            disputes.map((dispute, index) => (
              <Dispute key={index} dispute={dispute} />
            ))
          }
        </Grid>
      </Grid>
    </Box >
  )
}

export default Disputes