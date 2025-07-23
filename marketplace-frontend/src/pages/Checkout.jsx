import Typography from "@mui/material/Typography";
import PrimarySearchAppBar from "../components/AppBar";
import GroupsBar from "../components/GroupsBar";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

function Checkout() {
  return (
    <>
      <PrimarySearchAppBar />
      <GroupsBar />
      <Box display="flex" gap={20} sx={{ mt: 15, ml: 20 }}>
        <Box sx={{ width: 800, height: 500, boxShadow: 1 }}>
          <Typography variant="h5" sx={{ ml: 20, mt: 4 }}>
            Adress
          </Typography>
          <Typography variant="h5" sx={{ ml: 20, mt: 4 }}>
            Payment Method
          </Typography>
        </Box>
        <Box sx={{ width: 600, height: 500, boxShadow: 1 }}>
          <Typography variant="h5" sx={{}}>
            Resumo
          </Typography>
          <Button>Buy</Button>
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
