import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ProductCardAtCart from "../components/ProductCardatCart";
import Grid from "@mui/material/Grid";
import PrimarySearchAppBar from "../components/AppBar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import GroupsBar from "../components/GroupsBar";

function totalPrice(products) {
  let sum = 0.0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum;
}

function ShoppingCartPage() {
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();

  const fetchAllProducts = async () => {
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

      console.log("Data to be render:");
      console.log(retrievedProducts);
      setAllProducts(retrievedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const removeFromShoppingCart = async (productId) => {
    console.log("Product to be removed from Cart: " + productId);
    try {
      const response = await fetch(
        "http://localhost:8080/api/shopping/remove",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: 1,
            productId: productId,
          }),
        }
      );

      console.log(response);

      //const data = await response.json();

      //setar num state
      console.log("Answer after removing item from Shopping Cart:");
      //console.log(data);
      await fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="card">
        <PrimarySearchAppBar />
        <GroupsBar />
        <Box sx={{ ml: 85, mt: 10 }}>
          <Typography gutterBottom variant="h3">
            Shopping Cart
          </Typography>
        </Box>
      </div>
      <Grid container spacing={70}>
        <Grid>
          <Stack spacing={4}>
            {allProducts.map((item, index) => (
              <Box key={index} sx={{ p: 2, m: 1, width: 600, maxWidth: 600 }}>
                <ProductCardAtCart
                  key={item.productId}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  productId={item.productId}
                  onDelete={removeFromShoppingCart}
                />
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid>
          <Card sx={{ width: 500, height: 500 }}>
            <CardContent>
              <Typography sx={{ ml: 20 }} variant="h3" component="div">
                Summary
              </Typography>
              <Typography sx={{ mt: 10, whiteSpace: "pre" }} variant="h5">
                {"Subtotal:                              R$" +
                  totalPrice(allProducts)}
              </Typography>
              <Typography sx={{ mt: 5, whiteSpace: "pre" }} variant="h5">
                {"Discounts:                           R$ -100,00"}
              </Typography>
              <Typography sx={{ mt: 5, whiteSpace: "pre" }} variant="h5">
                {"Total:                                   R$ " +
                  totalPrice(allProducts)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{ mt: 8, ml: 25 }}
                variant="contained"
                size="large"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ShoppingCartPage;
