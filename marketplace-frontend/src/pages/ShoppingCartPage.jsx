import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import ProductCardAtCart from "../components/ProductCardatCart";
import PrimarySearchAppBar from "../components/AppBar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
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

  const token = localStorage.getItem("token");

  const fetchAllProducts = async () => {
    try {
      console.log("Fetching data of products in current Shopping cart");
      const response = await fetch("http://localhost:8080/api/shopping/list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
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
      <Box>
        <PrimarySearchAppBar showShoppingCart={false} />
        <GroupsBar />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Typography gutterBottom variant="h4" sx={{ fontWeight: "bold" }}>
            Shopping Cart
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "row",
          gap: 5,
          mt: 5,
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", width: "50%", overflowY: "auto" }}>
          <Stack spacing={5} sx={{}}>
            {allProducts.length == 0 ? (
              <Box
                sx={{
                  p: 2,
                  m: 1,
                  height: "250px",
                }}
              >
                <Typography sx={{ fontSize: 16 }}>
                  Not a product on your shopping cart.
                </Typography>
              </Box>
            ) : (
              allProducts.map((item) => (
                <ProductCardAtCart
                  key={item.productId}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  image={item.image}
                  productId={item.productId}
                  onDelete={removeFromShoppingCart}
                />
              ))
            )}
          </Stack>
        </Box>

        {allProducts.length != 0 ? (
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
                totalPrice(allProducts).toFixed(2)}
            </Typography>
            <Typography
              sx={{ fontSize: 16, mt: 3, whiteSpace: "pre" }}
              variant="h5"
            >
              {
                "Discounts:                                               R$ -100,00"
              }
            </Typography>
            <Typography
              sx={{ fontSize: 16, mt: 18, whiteSpace: "pre" }}
              variant="h5"
            >
              {"Total:                                                     R$ " +
                totalPrice(allProducts).toFixed(2)}
            </Typography>

            <Button
              sx={{ mt: 3 }}
              variant="contained"
              size="large"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </Button>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default ShoppingCartPage;
