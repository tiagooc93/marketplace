import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  function onClickAddProduct() {
    const sendProductData = async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);

      try {
        const response = await fetch(
          "http://localhost:8080/api/product/create",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log("Product created response:");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    sendProductData();
    navigate("/");
  }

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center" //align horizontally
        alignItems="center" //align vertically
        minHeight="100vh"
      >
        <Stack spacing={5} sx={{ width: "500px" }}>
          <TextField
            id="outlined-basic1"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic2"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            id="outlined-basic3"
            label="Price"
            variant="outlined"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImage} />
          </Button>
          <Button variant="contained" onClick={onClickAddProduct}>
            Anounce
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default AddProductPage;
