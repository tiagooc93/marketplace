import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PrimarySearchAppBarSimple from "../../components/AppBarSimple";
import Toolbar from "@mui/material/Toolbar";
import { useAddProductContext } from "./AddProductContext";

function AddProductPrice() {
  const navigate = useNavigate();

  const { productData, setProductData } = useAddProductContext();

  console.log("ProductData from context:", productData);

  const handlePriceChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      price: e.target.value,
    }));
  };

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>
      <Toolbar></Toolbar>
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/images")}
        >
          Back
        </Button>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/condition")}
        >
          Next
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="center" //align horizontally
        alignItems="center" //align vertically
        minHeight="60vh"
      >
        <Stack spacing={7} sx={{ width: "800px" }}>
          <Typography variant="h3">Set product's price</Typography>
          <TextField
            id="outlined-basic1"
            label="Price"
            variant="outlined"
            onChange={handlePriceChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default AddProductPrice;
