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
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          sx={{ fontSize: 18, border: 1, borderRadius: 2, pl: 4, pr: 4 }}
          onClick={() => {
            alert("Ad canceled, cleaning product data !");
            navigate("/");
          }}
        >
          Back
        </Button>

        <Button
          sx={{
            fontSize: 18,
            border: 1,
            borderRadius: 2,
            pl: 4,
            pr: 4,
            visibility: productData.name.trim() === "" ? "hidden" : "visible",
          }}
          onClick={() => navigate("/add-product/category")}
        >
          Next
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", //align horizontally
          alignItems: "center", //align vertically
          minHeight: "70vh",
          gap: 10,
        }}
      >
        <Typography variant="h3">What is the name of your product ?</Typography>
        <TextField
          sx={{ width: "900px" }}
          id="outlined-basic1"
          label="Name"
          value={productData.name}
          variant="outlined"
          onChange={handleChange}
        />
      </Box>
    </>
  );
}

export default AddProductName;
