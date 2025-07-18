import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PrimarySearchAppBar from "./AppBar";

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
  const imageSrc = `data:image/png;base64,${image}`;
  console.log("imageScr: " + imageSrc);
  console.log("product: ", name, ": ", description);

  return (
    <Card sx={{ height: 250, width: 1000 }}>
      <Grid container spacing={15} sx={{ width: 1000 }}>
        <Grid>
          <Box sx={{ p: 2, m: 1, maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="200"
              image={imageSrc}
              alt={name}
              sx={{ objectFit: "contain" }}
            />
          </Box>
        </Grid>
        <Grid>
          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 3 }}>
            Preço:
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            {price}
          </Typography>
        </Grid>
        <Grid>
          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 3 }}>
            Quantity:
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary", mt: 3 }}>
            1 unit
          </Typography>
        </Grid>
        <Grid>
          <IconButton
            onClick={() => onDelete(productId)}
            aria-label="delete"
            sx={{ mt: 7 }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
}
