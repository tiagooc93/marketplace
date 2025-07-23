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

const categories = ["New", "Used"];

function AddProductCondition() {
  const navigate = useNavigate();

  const { productData, setProductData } = useAddProductContext();

  const onConditionClick = (e) => {
    setProductData((prev) => ({
      ...prev,
      condition: e.target.innerText,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", productData.name);
      formData.append("category", productData.category);
      formData.append("description", productData.description);
      formData.append("longDescription", productData.longDescription);
      formData.append("price", productData.price);
      formData.append("condition", productData.condition);
      formData.append("image", productData.image);

      const response = await fetch("http://localhost:8080/api/product/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Saved successfully!");
        alert("Ad of your product was created!");
        navigate("/");
      } else {
        console.error("Failed to save");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log("ProductData from context:", productData);

  return (
    <>
      <PrimarySearchAppBarSimple></PrimarySearchAppBarSimple>
      <Toolbar></Toolbar>
      <Box display="flex" gap={120} justifyContent="center" sx={{ mt: 5 }}>
        <Button
          sx={{ fontSize: 20 }}
          onClick={() => navigate("/add-product/price")}
        >
          Back
        </Button>
        <Button sx={{ fontSize: 20 }} onClick={handleSubmit}>
          Create Ad !
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
            What is the condition of the product ?
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
                      onClick={onConditionClick}
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

export default AddProductCondition;
