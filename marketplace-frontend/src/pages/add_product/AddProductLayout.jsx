import { Outlet } from "react-router-dom";
import { AddProductProvider } from "./AddProductContext";

export default function AddProductLayout() {
  return (
    <AddProductProvider>
      <Outlet />
    </AddProductProvider>
  );
}
