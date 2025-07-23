import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import PrimarySearchAppBarSimple from "../../components/AppBarSimple";
import Typography from "@mui/material/Typography";
import { useAddProductContext } from "./AddProductContext";

function AddProductImages() {
  const { productData, setProductData } = useAddProductContext();
  console.log("ProductData from context:", productData);

  const onImageUpload = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const navigate = useNavigate();

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>

      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 5 }}>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/details")}
        >
          Back
        </Button>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/price")}
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
          <Typography variant="h3">Upload images of the product</Typography>
          <Stack spacing={5} sx={{ width: "500px" }}>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onImageUpload}
              />
            </Button>
            <Button variant="contained">Upload</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default AddProductImages;
