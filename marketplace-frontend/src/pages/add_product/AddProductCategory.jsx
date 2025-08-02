import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PrimarySearchAppBarSimple from "../../components/AppBarSimple";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useAddProductContext } from "./AddProductContext";
import { IconButton } from "@mui/material";

const categories = ["Books", "Eletronics", "Sports", "Kitchen", "Other"];

const images = [
  "/images/books.jpg",
  "/images/electronics.jpg",
  "/images/sports.jpg",
  "/images/kitchen.jpg",
];

function AddProductCategory() {
  const { productData, setProductData } = useAddProductContext();
  console.log("ProductData from context:", productData);

  const navigate = useNavigate();

  return (
    <>
      <PrimarySearchAppBarSimple />
      <Toolbar></Toolbar>
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 5 }}>
        <Button
          sx={{ fontSize: 18, border: 1, borderRadius: 2, pl: 4, pr: 4 }}
          onClick={() => navigate("/add-product/name")}
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
              productData.category.trim() === "" ? "hidden" : "visible",
          }}
          onClick={() => navigate("/add-product/details")}
        >
          Next
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center" //align horizontally
        alignItems="center" //align vertically
        minHeight="70vh"
        gap={10}
      >
        <Typography variant="h3">
          What of the following categories your product belong ?
        </Typography>

        <Box display="flex" gap={5}>
          {categories.map((page, index) => (
            <Box
              key={page}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  padding: 0,
                  overflow: "hidden",
                  boxShadow: 2,
                  backgroundColor: "#fff", // optional
                }}
                onClick={() => {
                  setProductData((prev) => ({
                    ...prev,
                    category: page,
                  }));
                }}
              >
                <img
                  src={images[index]}
                  alt="icon"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </IconButton>

              <Typography sx={{ fontSize: 15 }}>{page}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default AddProductCategory;
