import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import PrimarySearchAppBar from "./AppBar";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  name,
  price,
  description,
  image,
  productId,
}) {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: 400, width: 250, borderRadius: 5 }}>
      <CardActionArea
        onClick={() => {
          navigate("/product", {
            state: {
              productId: productId,
            },
          });
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={"http://localhost:8080" + image}
          alt={name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ${price.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
