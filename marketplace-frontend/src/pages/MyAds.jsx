import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ProductCardAtCart from "../components/ProductCardatCart";
import PrimarySearchAppBar from "../components/AppBar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GroupsBar from "../components/GroupsBar";

function MyAds() {
  const [allProducts, setAllProducts] = useState([]);

  const token = localStorage.getItem("token");

  const fetchMyAdsProducts = async () => {
    try {
      console.log("Fetching data of products of my Ads");
      const response = await fetch("http://localhost:8080/api/users/ads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      console.log("All product ad information: ");
      console.log(data);

      data = data["products"];

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
    fetchMyAdsProducts();
  }, []);

  const removeAd = async (productId) => {
    console.log("Product Ad to be removed: " + productId);
    try {
      const response = await fetch("http://localhost:8080/api/product/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to remove ad:", errorText);
        return;
      }

      // Check if there is content to parse
      const contentLength = response.headers.get("content-length");
      console.log("Content-Length header:", contentLength);

      if (contentLength && parseInt(contentLength) > 0) {
        const data = await response.json();
        console.log("Response JSON data:", data);
      } else {
        console.log("No response content.");
      }

      await fetchMyAdsProducts();
    } catch (error) {
      console.error("Error in removeAd:", error);
    }
  };

  return (
    <>
      <Box>
        <PrimarySearchAppBar />
        <GroupsBar />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Typography gutterBottom variant="h4" sx={{ fontWeight: "bold" }}>
            My Ads
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
          ml: 20,
          justifyContent: "flex-start",
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
                  You don't have any ad yet.
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
                  onDelete={removeAd}
                />
              ))
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default MyAds;
