import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import Rating from "@mui/material/Rating";

function ProductReview({ productId }) {
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const fetchProductReviews = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/review/" + productId
        );
        const data = await response.json();
        //setar num state
        console.log("All reviews fetched for this product:");
        console.log(data);

        const retrievedReviews = [];

        for (var i = 0; i < data.length; i++) {
          retrievedReviews.push({
            username: data[i]["username"],
            rating: data[i]["rating"],
            content: data[i]["content"],
          });
        }

        console.log("Reviews to be render:");
        console.log(retrievedReviews);
        setProductReviews(retrievedReviews);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductReviews();
  }, []);

  return (
    <>
      <Box sx={{ borderRadius: 1, boxShadow: 1, ml: 40, width: 1100 }}>
        <Typography variant="h5" sx={{ m: 2 }}>
          Product Reviews:
        </Typography>

        <Stack sx={{ boxShadow: 2, p: 3 }}>
          {productReviews.map((review) => {
            <>
              <Box display="flex">
                <IconButton size="large" color="inherit">
                  <AccountCircle />
                </IconButton>
                <Typography>{review["username"]}</Typography>
              </Box>
              <Rating
                name="half-rating-read"
                defaultValue={review["rating"]}
                precision={0.5}
                readOnly
                sx={{ ml: 5 }}
              />
              <Typography sx={{ fontSize: 20, m: 2 }}>
                {review["content"]}
              </Typography>
            </>;
          })}
        </Stack>
      </Box>
    </>
  );
}

export default ProductReview;
