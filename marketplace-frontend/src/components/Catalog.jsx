import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

export default function Catalog({ title, limit = 100, category = "" }) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (category === "") return;

    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/product/list");
        const data = await response.json();
        //setar num state
        console.log("All data fetched products:");
        console.log(data);

        const retrievedProducts = [];

        for (var i = 0; i < data.length; i++) {
          retrievedProducts.push({
            name: data[i]["name"],
            description: data[i]["description"],
            price: data[i]["price"],
            image: data[i]["image"],
            productId: data[i]["id"],
            category: data[i]["category"],
          });
        }

        let filteredData = [];

        if (category !== "") {
          filteredData = retrievedProducts.filter(
            (item) => item.category === category
          );
        }
        filteredData = filteredData.slice(0, limit);

        console.log("Data to be render:");
        console.log(filteredData);
        setAllProducts(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "75%",
          mx: "auto",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 10 }}>
          {title}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 5, justifyContent: "center" }}>
          {allProducts.map((item, index) => (
            <Box key={index} sx={{ maxWidth: 400 }}>
              <ProductCard
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
                productId={item.productId}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
}
