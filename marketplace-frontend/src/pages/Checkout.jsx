import Typography from "@mui/material/Typography";
import PrimarySearchAppBar from "../components/AppBar";
import GroupsBar from "../components/GroupsBar";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";

function totalPrice(products) {
  let sum = 0.0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum;
}

function Checkout() {
  const [order, setOrder] = useState({});

  const onClickFinishOrder = async () => {
    console.log("Sending order: ", order);
    try {
      const response = await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const message = await response.text();
        alert("Payment initiated: " + message);
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
      const response = await fetch("http://localhost:8080/api/shopping/list/1");
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
      let orderData = {
        value: value,
        shoppingCartId: 1,
        userEmail: 1,
      };
      setOrder(orderData);

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
          <Typography variant="h5" sx={{ ml: 20, mt: 4 }}>
            Adress
          </Typography>
          <Typography variant="h5" sx={{ ml: 20, mt: 4 }}>
            Payment Method
          </Typography>
        </Box>
        <Box sx={{ width: 600, height: 500, boxShadow: 1 }}>
          <Typography variant="h5" sx={{}}>
            Resumo
          </Typography>
          <Button onClick={onClickFinishOrder}>Buy</Button>
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
