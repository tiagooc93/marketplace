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
          sx={{ fontSize: 18, border: 1, borderRadius: 2, pl: 4, pr: 4 }}
          onClick={() => navigate("/add-product/details")}
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
            visibility: productData.image == null ? "hidden" : "visible",
          }}
          onClick={() => navigate("/add-product/price")}
        >
          Next
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          gap: 10,
        }}
      >
        <Typography variant="h3">Upload images of the product</Typography>

        <Button
          variant="outlined"
          component="label"
          sx={{ fontSize: 15, border: 2, color: "blue" }}
        >
          Click here to Upload Image
          <input type="file" accept="image/*" hidden onChange={onImageUpload} />
        </Button>
      </Box>
    </>
  );
}

export default AddProductImages;
