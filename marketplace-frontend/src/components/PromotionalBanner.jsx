import Box from "@mui/material/Box";
import banner from "../images/banner3.png";
import CardMedia from "@mui/material/CardMedia";

function PromotionalBanner() {
  return (
    <>
      <Box>
        <CardMedia
          component="img"
          height="300"
          width="1000"
          image={banner}
          sx={{ mt: 3, objectFit: "contain" }}
        />
      </Box>
    </>
  );
}

export default PromotionalBanner;
