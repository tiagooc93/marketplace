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

const categories = [
  "Books",
  "Eletronics",
  "Music",
  "Kitchen",
  "Top Sellers",
  "Room",
];

function AddProductCategory() {
  const { productData, setProductData } = useAddProductContext();
  console.log("ProductData from context:", productData);

  const onCategoryClick = (e) => {
    setProductData((prev) => ({
      ...prev,
      category: e.target.innerText,
    }));
  };

  const navigate = useNavigate();

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>
      <Toolbar></Toolbar>
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 5 }}>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/name")}
        >
          Back
        </Button>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/details")}
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
        <Stack spacing={10} sx={{ width: "1000px" }}>
          <Typography variant="h3">
            What of the following categories your product belong ?
          </Typography>

          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              ></Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Box display="flex" gap={2}>
                  {categories.map((page) => (
                    <Button
                      key={page}
                      sx={{
                        p: 5,
                        color: "black",
                        display: "block",
                        border: 1,
                        borderRadius: 10,
                      }}
                      onClick={onCategoryClick}
                    >
                      <Typography sx={{ fontSize: 15 }}>{page}</Typography>
                    </Button>
                  ))}
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </Stack>
      </Box>
    </>
  );
}

export default AddProductCategory;
