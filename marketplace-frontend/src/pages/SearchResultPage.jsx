import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PrimarySearchAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import GroupsBar from "../components/GroupsBar";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";

function SearchResultPage() {
  const [allProducts, setAllProducts] = useState([]);

  const location = useLocation();
  const searchString = location.state.searchString;
  console.log("On Search Result Page, search value = " + searchString);

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

        const filteredData = retrievedProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchString.toLowerCase()) ||
            item.description.toLowerCase().includes(searchString.toLowerCase())
        );

        setAllProducts(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <>
      <Box>
        <PrimarySearchAppBar />
        <GroupsBar />
      </Box>
      <Grid container spacing={0} sx={{ ml: 5 }}>
        <Grid>
          <Card
            sx={{
              mt: 5,
              width: 240,

              position: "sticky",
              top: 10,
              boxShadow: 0,
            }}
          >
            <Typography
              fontWeight="bold"
              variant="body1"
              sx={{ mt: 5, ml: 9, mb: 3 }}
            >
              FILTERS:
            </Typography>
            <Typography
              fontWeight="bold"
              variant="body1"
              sx={{ mt: 5, ml: 9, mb: 3 }}
            >
              Price
            </Typography>
            <Box display="flex" gap={2} sx={{ pb: 4, borderBottom: 1 }}>
              <TextField id="outlined-basic" label="Min" variant="outlined" />
              <TextField id="outlined-basic" label="Max" variant="outlined" />
              <IconButton size="small" color="inherit">
                <SearchIcon />
              </IconButton>
            </Box>

            <Typography
              fontWeight="bold"
              variant="body1"
              sx={{ mt: 6, ml: 8, mb: 3 }}
            >
              Brand
            </Typography>
            <FormGroup sx={{ pb: 4, borderBottom: 1 }}>
              <FormControlLabel control={<Checkbox />} label="Fender" />
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Yamaha"
              />
              <FormControlLabel control={<Checkbox />} label="Gibson" />
            </FormGroup>
            <Typography
              fontWeight="bold"
              variant="body1"
              sx={{ mt: 6, ml: 8, mb: 3 }}
            >
              Condition
            </Typography>
            <FormGroup sx={{ pb: 4, borderBottom: 1 }}>
              <FormControlLabel control={<Checkbox />} label="New" />
              <FormControlLabel required control={<Checkbox />} label="Used" />
            </FormGroup>
            <Typography
              fontWeight="bold"
              variant="body1"
              sx={{ mt: 6, ml: 8, mb: 3 }}
            >
              Rating
            </Typography>
            <Box>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Rating name="read-only" readOnly value={4} />
                  <Typography component="legend">4 e acima</Typography>
                </Box>
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Rating name="read-only" readOnly value={3} />
                  <Typography component="legend">3 e acima</Typography>
                </Box>
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Rating name="read-only" readOnly value={2} />
                  <Typography component="legend">2 e acima</Typography>
                </Box>
              </Button>
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Rating name="read-only" readOnly value={1} />
                  <Typography component="legend">1 e acima</Typography>
                </Box>
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid>
          <Grid container spacing={0} sx={{ m: 10 }}>
            {allProducts.map((item, index) => (
              <Box key={index} sx={{ p: 2, m: 1, maxWidth: 400 }}>
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
        </Grid>
      </Grid>
    </>
  );
}

export default SearchResultPage;
