import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/AppBar";
import GroupsBar from "../components/GroupsBar";
import ProductReview from "../components/ProductReview";

function onClickAddCart(productId) {
  console.log("Produto a ser adicionado no Cart:" + productId);

  const addToShoppingCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/shopping/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          productId: productId,
        }),
      });

      console.log(response);

      //const data = await response.json();
      //setar num state
      console.log("Resposta apos adicao de produtor ao Shopping Cart:");
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  addToShoppingCart();
}

function ProductPage() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const productId = location.state.productId;
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Retrieving data of product: " + productId);

    const fetchProductData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/product/" + productId
        );
        const data = await response.json();
        //setar num state
        console.log("Product data fetched:");
        console.log(data);

        const retrievedProduct = {
          name: data["name"],
          description: data["description"],
          longDescription: data["longDescription"],
          price: data["price"],
          image: data["image"],
          rating: data["rating"],
        };

        const response2 = await fetch(
          "http://localhost:8080/api/review/" + productId
        );
        const data2 = await response2.json();
        //setar num state
        console.log("Product reviews fetched:");
        console.log(data2);

        let retrievedReviews = [];

        for (var i = 0; i < data2.length; i++) {
          retrievedReviews.push({
            username: data2[i]["username"],
            rating: data2[i]["rating"],
            content: data2[i]["content"],
          });
        }

        setReviews(retrievedReviews);
        console.log("Review Data to be render:");
        console.log(retrievedReviews);

        setProduct(retrievedProduct);
        console.log("Product Data to be render:");
        console.log(retrievedProduct);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) return <Box>Loading...</Box>;

  return (
    <>
      <PrimarySearchAppBar />
      <GroupsBar />
      <Box sx={{ ml: 40, mt: 20, flexGrow: 1, boxShadow: 2, width: 1100 }}>
        <Grid container spacing={10} sx={{ m: 4 }}>
          <Grid>
            <Box
              component="img"
              sx={{
                border: 1,
                objectFit: "contain",

                height: 400,
                width: 400,
              }}
              alt="The house from the offer."
              src={"http://localhost:8080" + product.image}
            />
          </Grid>
          <Grid>
            <Box>
              <Typography variant="h3" sx={{}}>
                {product.name}
              </Typography>
              <Stack sx={{ mt: 3 }}>
                <Rating
                  name="half-rating-read"
                  defaultValue={product.rating}
                  precision={0.5}
                  readOnly
                />
              </Stack>
              <Typography
                fontWeight={"fontWeightBold"}
                variant="h4"
                sx={{ mt: 3 }}
              >
                R$ {product.price}
              </Typography>
              <Typography sx={{ mt: 5 }}>{product.description}</Typography>

              <Typography sx={{ mt: 2 }}>Info 1</Typography>
              <Typography sx={{ mt: 2 }}>Info 2</Typography>
              <Typography sx={{ mt: 2 }}>Brand: </Typography>
              <Typography sx={{ mt: 2 }}>Product Condition: </Typography>
              <Button variant="contained" sx={{ mt: 7, mb: 5 }}>
                Buy
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 5, mt: 7, mb: 5 }}
                onClick={() => {
                  onClickAddCart(productId);
                  navigate("/", { state: { showAddToCartSnackBar: true } });
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 5, mt: 7, mb: 5 }}
                onClick={() => {
                  onClickAddCart(productId);
                  navigate("/my-chats", {
                    state: {
                      createNewConversation: true,
                      sellerId: 2,
                      sellerName: "Joao",
                      productId: productId,
                      productName: product.name,
                      productImage: product.image,
                    },
                  });
                }}
              >
                Talk with the Seller
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ borderRadius: 3, boxShadow: 1, ml: 40, width: 1100 }}>
        <Typography
          fontWeight={"fontWeightBold"}
          variant="h5"
          sx={{ pt: 3, pl: 3 }}
        >
          Product Information:
        </Typography>
        <Typography
          sx={{ fontSize: 20, m: 2 }}
          dangerouslySetInnerHTML={{ __html: product.longDescription }}
        ></Typography>
      </Box>
      <Box sx={{ borderRadius: 1, boxShadow: 1, ml: 40, width: 1100 }}>
        <Typography variant="h5" sx={{ m: 2 }}>
          Product Reviews:
        </Typography>

        <Stack sx={{ boxShadow: 2, p: 3 }}>
          {reviews.map((item) => (
            <>
              <Box display="flex">
                <IconButton size="large" color="inherit">
                  <AccountCircle />
                </IconButton>
                <Typography>{item.username}</Typography>
              </Box>
              <Rating
                name="half-rating-read"
                defaultValue={item.rating}
                precision={0.5}
                readOnly
                sx={{ ml: 5 }}
              />
              <Typography sx={{ fontSize: 20, m: 2 }}>
                {item.content}
              </Typography>
            </>
          ))}
        </Stack>
      </Box>
    </>
  );
}

export default ProductPage;
