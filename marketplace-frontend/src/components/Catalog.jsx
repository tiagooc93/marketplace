import Box from "@mui/material/Box";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

export default function Catalog({ title }) {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
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
          });
        }

        console.log("Data to be render:");
        console.log(retrievedProducts);
        setAllProducts(retrievedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", ml: 5, mt: 10 }}>
        {title}
      </Typography>
      <Grid container spacing={3} sx={{ ml: 5, mt: 5 }}>
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
    </>
  );
}
