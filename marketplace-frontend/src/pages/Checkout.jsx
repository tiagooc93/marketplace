import Typography from "@mui/material/Typography";
import PrimarySearchAppBar from "../components/AppBar";
import GroupsBar from "../components/GroupsBar";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";

function totalPrice(products) {
  let sum = 0.0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum;
}

function Checkout() {
  const [orderValue, setOrderValue] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Effect that fetches user data: ");
    const fetchCurrentUser = async () => {
      const response = await fetch("http://localhost:8080/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        console.log("Response after fetching user data: ", userData);
        setUserId(userData.id);
        setUserEmail(userData.email);
      } else {
        // handle error
      }
    };

    fetchCurrentUser();
  }, []);

  const onClickFinishOrder = async () => {
    let order = {
      value: orderValue,
      shoppingCartId: userId,
      userEmail: userEmail,
    };

    console.log("Sending order: ", order);
    try {
      const response = await fetch("http://localhost:8082/api/order/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const message = await response.text();
        alert("Payment initiated: " + message);
        navigate("/");
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Something went wrong");
    }
  };

  const fetchCartAndSetOrder = async () => {
    try {
      console.log("Fetching data of products in current Shopping cart");
      const response = await fetch("http://localhost:8080/api/shopping/list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      //setar num state
      console.log("All data from cart fetched products:");
      console.log(data);

      const retrievedProducts = [];

      for (var i = 0; i < data.length; i++) {
        retrievedProducts.push({
          name: data[i]["name"],
          description: data[i]["description"],
          price: data[i]["price"],
          image: data[i]["image"],
          productId: data[i]["id"],
        });
      }

      let value = totalPrice(retrievedProducts);
      setOrderValue(value);

      console.log("Data to be render:");
      console.log(retrievedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartAndSetOrder();
  }, []);

  return (
    <>
      <PrimarySearchAppBar />
      <GroupsBar />
      <Box display="flex" gap={20} sx={{ mt: 15, ml: 20 }}>
        <Box sx={{ width: 800, height: 500, boxShadow: 1 }}>
          <Typography variant="h5" sx={{ fontSize: 20, ml: 4, mt: 4 }}>
            Adress
          </Typography>
          <Typography variant="h5" sx={{ fontSize: 20, ml: 4, mt: 4 }}>
            Payment Method
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            width: "350px",
            p: 4,
            height: "400px",
          }}
        >
          <Typography
            sx={{ fontSize: 25, pb: 3, borderBottom: 1 }}
            align="center"
          >
            Summary
          </Typography>
          <Typography
            sx={{ fontSize: 16, mt: 3, whiteSpace: "pre" }}
            variant="h5"
          >
            {"Subtotal:                                                 R$ " +
              orderValue}
          </Typography>
          <Typography
            sx={{ fontSize: 16, mt: 25, whiteSpace: "pre" }}
            variant="h5"
          >
            {"Total:                                                     R$ " +
              orderValue}
          </Typography>

          <Button
            onClick={onClickFinishOrder}
            sx={{ mt: 4 }}
            variant="contained"
            size="large"
          >
            Finish and Buy !
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
