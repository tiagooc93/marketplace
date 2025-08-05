import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../components/AppBar";
import GroupsBar from "../components/GroupsBar";
import { AuthProvider, useAuth } from "../AuthContext";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function onClickAddCart(productId) {
  console.log("Product to be added to Cart:" + productId);

  const token = localStorage.getItem("token");

  const addToShoppingCart = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/shopping/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
        }),
      });

      console.log(response);
      //const data = await response.json();
      //setar num state
      console.log("Response after adding product to Shopping Cart:");
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
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();

  const productId = location.state.productId;
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [size, setSize] = useState("");

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSize(newSize);
    }
  };

  const handleTalkToSeller = async () => {
    const newConversationData = {
      receiverId: product.sellerId,
      receiverName: product.sellerUsername,
      productId: productId,
      productName: product.name,
      productImage: product.image,
    };
    console.log("NEW CONVERSATION DATA: ", newConversationData);
    try {
      const response = await fetch(
        "http://localhost:8080/api/chat/conversation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newConversationData),
        }
      );

      const data = await response.json();
      console.log("response: ", data);
      navigate("/my-chats");
    } catch (err) {
      console.error("Error:", err);
    }
  };

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
          category: data["category"],
          price: data["price"],
          image: data["image"],
          condition: data["condition"],
          rating: data["rating"],
          sellerId: data["sellerId"],
          sellerUsername: data["sellerUsername"],
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          mt: 10,
          mx: "auto",
          width: "70%",
          gap: 10,
        }}
      >
        <Box
          component="img"
          sx={{
            border: 1,
            borderRadius: 5,
            objectFit: "contain",
            height: "100%",
            width: 600,
            mt: 3,
          }}
          alt="The house from the offer."
          src={"http://localhost:8080" + product.image}
        />

        <Box
          sx={{
            display: "flex",
            width: "40%",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignContent: "row",
              mt: 2,
              gap: 2,
              pb: 1,
              borderBottom: 1,
            }}
          >
            <Typography sx={{ fontSize: 13 }}>
              {product.rating.toFixed(1) + " "}
            </Typography>
            <Rating
              size="small"
              name="half-rating-read"
              sx={{
                "& .MuiRating-icon": {
                  fontSize: 16, // smaller font size than default (~24)
                },
              }}
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            />
            <Typography sx={{ fontSize: 13 }}>{"(" + 221 + ")"}</Typography>
          </Box>
          <Box sx={{ mt: 5, pb: 4, borderBottom: 1 }}>
            <Typography variant="h4">$ {product.price.toFixed(2)}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography sx={{ fontSize: 12 }}>Seller: </Typography>
            <Button
              variant="transparent"
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "blue",

                pl: 1,
                minWidth: "auto",
              }}
              onClick={() => {}}
            >
              {product.sellerUsername}
            </Button>
            <Button
              variant="outlined"
              sx={{ textTransform: "none", fontSize: 12, color: "blue" }}
              onClick={handleTalkToSeller}
            >
              Send a message to the seller
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 3, gap: 3 }}>
            <Typography sx={{ fontSize: 13 }}>
              Condition: {product.condition}
            </Typography>
            {product.category === "cloth" && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <ToggleButtonGroup
                  value={size}
                  exclusive
                  onChange={handleSizeChange}
                  aria-label="clothing size"
                  color="primary"
                  sx={{ fontSize: 13 }}
                >
                  <ToggleButton value="XS" aria-label="extra small">
                    XS
                  </ToggleButton>
                  <ToggleButton value="S" aria-label="small">
                    S
                  </ToggleButton>
                  <ToggleButton value="M" aria-label="medium">
                    M
                  </ToggleButton>
                  <ToggleButton value="L" aria-label="large">
                    L
                  </ToggleButton>
                  <ToggleButton value="XL" aria-label="extra large">
                    XL
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}

            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              sx={{ min: 1, width: 100, fontSize: 13 }}
            />
          </Box>

          <Box
            sx={{
              fontSize: 20,
              display: "flex",
              flexDirection: "column",
              mt: 10,
              gap: 4,
            }}
          >
            <Button
              onClick={() => {
                if (isAuthenticated) {
                  onClickAddCart(productId);
                  navigate("/cart");
                } else {
                  navigate("/login");
                }
              }}
              variant="contained"
              sx={{ fontWeight: "bold" }}
            >
              Buy Now !
            </Button>
            <Button
              variant="outlined"
              sx={{ fontWeight: "bold" }}
              onClick={() => {
                if (isAuthenticated) {
                  onClickAddCart(productId);
                  navigate("/", { state: { showAddToCartSnackBar: true } });
                } else {
                  navigate("/login");
                }
              }}
            >
              Add to Cart
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mt: 5,
            }}
          ></Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          borderRadius: 3,
          mx: "auto",
          boxShadow: 1,
          mt: 3,
          p: 2,
        }}
      >
        <Typography
          fontWeight={"fontWeightBold"}
          variant="h5"
          sx={{ pl: 2, mt: 2 }}
        >
          Product Information:
        </Typography>
        <Typography sx={{ fontSize: 20, mt: 3 }}>
          {product.longDescription}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mx: "auto",
          boxShadow: 1,
          width: "70%",
          mt: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{ pl: 2, mt: 2, mb: 3, fontWeight: "bold" }}
        >
          Product Reviews:
        </Typography>

        <Stack sx={{ boxShadow: 2 }}>
          {reviews.map((item) => (
            <Box sx={{ mt: 2, borderBottom: "0.5px solid grey" }}>
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
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}

export default ProductPage;
