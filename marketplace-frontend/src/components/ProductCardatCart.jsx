import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PrimarySearchAppBar from "./AppBar";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductCardAtCart({
  name,
  price,
  description,
  image,
  productId,
  onDelete,
}) {
  console.log("imageScr: " + image);
  console.log("product: ", name, ": ", description);

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        height: "170px",
        width: "900px",
        boxShadow: 2,
      }}
    >
      <IconButton
        onClick={() => {
          navigate("/product", {
            state: {
              productId: productId,
            },
          });
        }}
      >
        <Box
          component="img"
          src={"http://localhost:8080" + image}
          alt={name}
          sx={{
            ml: 2,
            height: "150px",
            objectFit: "contain",
            width: "150px",
            borderRadius: 5,
          }}
        />
      </IconButton>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ mt: 3 }}>
          Price:
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "text.secondary", mt: 3 }}
        >
          ${price.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ mt: 3 }}>
          Quantity:
        </Typography>
        <Typography variant="h5" sx={{ color: "text.secondary", mt: 3 }}>
          1 unit
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <IconButton
          size="large"
          onClick={() => onDelete(productId)}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
