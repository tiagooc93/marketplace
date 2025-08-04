import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PrimarySearchAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import GroupsBar from "../components/GroupsBar";
import { useSearchParams } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";

function SearchResultPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [minPriceValue, setMinPriceValue] = useState("");
  const [maxPriceValue, setMaxPriceValue] = useState("");

  const [filterByPrice, setFilterByPrice] = useState(false);

  const [filterByRating, setFilterByRating] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState(new Set());

  const categories = new Set([
    "book",
    "electronic",
    "music",
    "kitchen",
    "top Sellers",
    "room",
  ]);

  const [searchParams] = useSearchParams();
  const searchString = searchParams.get("query") || "";
  console.log("On Search Result Page, search value = " + searchString);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/product/list");
        const data = await response.json();

        console.log("All data fetched products:");
        console.log(data);

        const retrievedProducts = [];

        for (var i = 0; i < data.length; i++) {
          retrievedProducts.push({
            name: data[i]["name"],
            description: data[i]["description"],
            category: data[i]["category"],
            price: data[i]["price"],
            image: data[i]["image"],
            brand: data[i]["brand"],
            productId: data[i]["id"],
          });
        }

        console.log("Data to be render:");
        console.log(retrievedProducts);

        const filteredData = retrievedProducts.filter((item) => {
          if (categories.has(searchString.toLowerCase())) {
            return item.category
              .toLowerCase()
              .includes(searchString.toLowerCase());
          } else {
            return (
              item.name.toLowerCase().includes(searchString.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(searchString.toLowerCase())
            );
          }
        });

        setAllProducts(filteredData);
        setFilteredProducts(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, [searchString]);

  function FilterBySideFilters() {
    console.log("Filter By Price: ", filterByPrice);
    console.log("Filter By Brand: ", filterByRating);
    console.log("Selected Brands:", selectedBrands);

    let filteredData = allProducts;
    if (filterByPrice) {
      filteredData = filteredData.filter(
        (item) => item.price >= minPriceValue && item.price <= maxPriceValue
      );
    }

    if (selectedBrands.size > 0) {
      filteredData = filteredData.filter((item) =>
        selectedBrands.has(item.brand)
      );
    }

    if (filterByRating) {
      filteredData = filteredData.filter((item) => item.rating >= 3);
    }

    setFilteredProducts(filteredData);
  }

  useEffect(() => {
    FilterBySideFilters();
  }, [filterByPrice, filterByRating, selectedBrands]);

  return (
    <>
      <Box>
        <PrimarySearchAppBar />
        <GroupsBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "flex-start",
          mx: "auto",
          width: "95%",
        }}
      >
        <Box sx={{}}>
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
              <TextField
                id="outlined-basic"
                label="Min"
                variant="outlined"
                onChange={(e) => setMinPriceValue(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Max"
                variant="outlined"
                onChange={(e) => setMaxPriceValue(e.target.value)}
              />
              <IconButton
                size="small"
                color="inherit"
                onClick={() => {
                  if (filterByPrice) {
                    FilterBySideFilters();
                  } else {
                    setFilterByPrice(true);
                  }
                }}
              >
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
              {[...new Set(allProducts.map((p) => p.brand))].map((brand) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBrands.has(brand)}
                      onChange={(e) => {
                        let newSelectedBrands = new Set(selectedBrands);

                        if (e.target.checked) {
                          newSelectedBrands.add(brand);
                        } else {
                          newSelectedBrands.delete(brand);
                        }
                        setSelectedBrands(newSelectedBrands);
                      }}
                    />
                  }
                  label={brand}
                />
              ))}
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
                onClick={() => {
                  setFilterByRating(true);
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
                onClick={() => {
                  setFilterByRating(true);
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
                onClick={() => {
                  setFilterByRating(true);
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
                onClick={() => {
                  setFilterByRating(true);
                }}
              >
                <Box display="flex" gap={2} sx={{ mb: 2 }}>
                  <Rating name="read-only" readOnly value={1} />
                  <Typography component="legend">1 e acima</Typography>
                </Box>
              </Button>
            </Box>
          </Card>
        </Box>
        <Box sx={{ mt: 10, ml: 5 }}>
          <Typography variant="h5" sx={{}}>
            Resultados para a pesquisa:
          </Typography>
          <Grid>
            <Grid container spacing={3} sx={{ mt: 5 }}>
              {filteredProducts.map((item, index) => (
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
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default SearchResultPage;
