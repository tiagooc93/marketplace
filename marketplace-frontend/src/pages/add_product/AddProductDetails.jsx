import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PrimarySearchAppBarSimple from "../../components/AppBarSimple";
import Toolbar from "@mui/material/Toolbar";
import { useAddProductContext } from "./AddProductContext";

function AddProductDetails() {
  const { productData, setProductData } = useAddProductContext();
  console.log("ProductData from context:", productData);

  const navigate = useNavigate();

  const handleShortDescriptionChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleLongDescriptionChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      longDescription: e.target.value,
    }));
  };

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>
      <Toolbar></Toolbar>
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 5 }}>
        <Button
          sx={{ fontSize: 18, border: 1, borderRadius: 2, pl: 4, pr: 4 }}
          onClick={() => navigate("/add-product/category")}
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
            visibility:
              productData.description.trim() !== "" &&
              productData.longDescription.trim() !== ""
                ? "visible"
                : "hidden",
          }}
          onClick={() => navigate("/add-product/images")}
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
        <Stack spacing={5} sx={{ width: "800px" }}>
          <Typography variant="h3">
            Write below a short and a long description for your product
          </Typography>
          <TextField
            id="outlined-basic1"
            label="Short Description"
            value={productData.description}
            variant="outlined"
            onChange={handleShortDescriptionChange}
          />
          <TextField
            id="outlined-basic1"
            label="Long Description"
            variant="outlined"
            multiline
            rows={15} // Sets the initial number of visible rows
            value={productData.longDescription}
            onChange={handleLongDescriptionChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default AddProductDetails;
