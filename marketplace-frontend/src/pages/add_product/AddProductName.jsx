import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PrimarySearchAppBarSimple from "../../components/AppBarSimple";
import Toolbar from "@mui/material/Toolbar";
import { useAddProductContext } from "./AddProductContext";

function AddProductName() {
  const { productData, setProductData } = useAddProductContext();
  console.log("ProductData from context:", productData);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>
      <Toolbar></Toolbar>
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 5 }}>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => alert("Anuncio cancelado, limpando dados")}
        >
          Back
        </Button>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/category")}
        >
          Next
        </Button>
      </Box>

      <Box
        display="flex"
        justifyContent="center" //align horizontally
        alignItems="center" //align vertically
        minHeight="70vh"
      >
        <Stack spacing={5} sx={{ width: "800px" }}>
          <Typography variant="h3">
            What is the name of your product ?
          </Typography>
          <TextField
            id="outlined-basic1"
            label="Name"
            variant="outlined"
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default AddProductName;
