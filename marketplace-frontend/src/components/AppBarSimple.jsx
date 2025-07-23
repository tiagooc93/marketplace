import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBarSimple() {
  const navigate = useNavigate();

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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
