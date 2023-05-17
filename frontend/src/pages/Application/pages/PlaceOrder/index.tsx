import {
  Typography,
  Grid,
  Stack,
  Box,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import AgeVerifier from "../AgeVerifier";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../../contexts/CartContext";

const PlaceOrder = () => {
  const [age, setAge] = useState<number | null>(null);

  const { state } = useContext(CartContext)
  const handleOrder = async () => {

    if (!state.items.length) return alert("Cart is empty")

    if (!age) return alert("Please verify your age")
    // check if any item in cart has minimum age requirement

    state.items.forEach(item => {
      console.log(item?.item?.minimum_age, age);
      if (item?.item?.minimum_age && item?.item?.minimum_age > age) {
        alert(`You must be at least ${item?.item?.minimum_age} years old to purchase ${item?.item?.title}`)
        return
      }
    })

    const items = state.items.map(item => ({ item: item?.item_id!, quantity: item.quantity, market_price: item?.market_price!, itemType: item?.item?.inventory_type }))
    const response = await fetch(`${import.meta.env.VITE_URL || "http://localhost:8000"}/api/orders`, {
      method: "POST",
      body: JSON.stringify({ items: items }),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("cart", "{}")
      window.location.href = data.payment.url
    }
  }


  useEffect(() => {
    console.log(age);
  }, [age]);

  return (
    <Box className="p-5 border-[1px] rounded-md">
      <AgeVerifier setAge={setAge} onContinue={handleOrder} />
    </Box>
  );
}

export default PlaceOrder