import PrimarySearchAppBar from "./components/AppBar";
import Catalog from "./components/Catalog";

import Snackbar from "@mui/material/Snackbar";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GroupsBar from "./components/GroupsBar";
import GroupsCircles from "./components/GroupsCircles";
import PromotionalBanner from "./components/PromotionalBanner";

function App() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("aqui: ", location.state);
    if (location.state?.showAddToCartSnackBar) {
      setOpen(true);
    }
  }, [location.state]);

  const handleClose = () => {
    console.log("handling close");
    setOpen(false);
  };

  return (
    <>
      <div className="card">
        <PrimarySearchAppBar />
        <GroupsBar />
        <PromotionalBanner />
      </div>

      <Catalog title="The best Electronics: " />
      <GroupsCircles></GroupsCircles>
      <Catalog title="Choose a new item for your kitchen" />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Produto adicionado ao carrinho !"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
}

export default App;
