import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useAuth } from "../AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,

  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "25%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  border: "1px solid #ccc",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
}));

export default function PrimarySearchAppBar({ showShoppingCart = true }) {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { isAuthenticated } = useAuth();

  const [shoppingCartNumberOfItems, setShoppingCartNumberOfItems] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    console.log("Getting number of items on Shopping Cart for the Badge");

    const token = localStorage.getItem("token");

    const getShoppingCartNumberOfItens = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/shopping/size",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        const size = data["size"];

        console.log("Response for shopping cart number of items:", data);
        setShoppingCartNumberOfItems(size);
      } catch (error) {
        console.log(error);
      }
    };

    getShoppingCartNumberOfItens();
  }, []);

  function onShoppingCartClick() {
    navigate("/cart");
  }

  const [searchString, setSearchString] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("User pressed Enter with search:", searchString);
      navigate(`/search?query=${encodeURIComponent(searchString)}`);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // open menu
  };

  const handleClose = () => {
    setAnchorEl(null); // close menu
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Button
            sx={{
              color: "black",
              textTransform: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              MarketPlace
            </Typography>
          </Button>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchString}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                navigate("/add-product/name");
              }}
              sx={{
                color: "black",
                textTransform: "none",
                backgroundColor: "transparent",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                noWrap
                sx={{
                  pr: 4,

                  display: { color: "black", xs: "none", sm: "block" },
                }}
              >
                Create Ad
              </Typography>
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                  }}
                  sx={{
                    color: "black",
                    textTransform: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    noWrap
                    sx={{
                      pr: 5,

                      display: { color: "black", xs: "none", sm: "block" },
                    }}
                  >
                    My Account
                  </Typography>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/my-ads");
                    }}
                  >
                    My Products
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/my-chats", {
                        state: { createNewConversation: false },
                      });
                    }}
                  >
                    My Chats
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => {
                  navigate("/my-chats", {
                    state: {
                      createNewConversation: false,
                    },
                  });
                }}
                sx={{
                  color: "black",
                  textTransform: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  noWrap
                  sx={{
                    pr: 5,

                    display: { color: "black", xs: "none", sm: "block" },
                  }}
                >
                  Sign In
                </Typography>
              </Button>
            )}

            {showShoppingCart && (
              <IconButton
                sx={{ border: 1 }}
                size="large"
                edge="end"
                onClick={onShoppingCartClick}
                color="inherit"
              >
                <Badge
                  badgeContent={shoppingCartNumberOfItems}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "15px",
                      height: 30,
                      minWidth: 30,
                      padding: "0 px",
                      borderRadius: "50%",
                    },
                  }}
                  color="error"
                >
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
