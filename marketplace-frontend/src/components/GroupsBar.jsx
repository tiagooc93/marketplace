import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const pages = ["Electronic", "Clothes", "Kitchen", "Sports", "Books", "Used"];

function GroupsBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0.5}
      sx={{ backgroundColor: "#123456" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          ></Box>
          <Box
            sx={{ flexGrow: 1, ml: 40, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  ml: 5,
                  my: 2,
                  color: "white",
                  display: "block",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={
                  () => navigate(`/search?query=${encodeURIComponent(page)}`)
                  /*navigate("/search", {
                    state: { searchString: page },
                    replace: true,
                  }) */
                }
              >
                <Typography sx={{ fontSize: 15 }}>{page}</Typography>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default GroupsBar;
