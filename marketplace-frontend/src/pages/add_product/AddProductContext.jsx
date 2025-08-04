import { Category } from "@mui/icons-material";
import { createContext, useContext, useState } from "react";

const AddProductContext = createContext();

export const AddProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    description: "",
    longDescription: "",
    price: "",
    image: null,
    condition: "",
  });

  return (
    <AddProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProductContext = () => {
  const context = useContext(AddProductContext);
  if (!context) {
    throw new Error("useProductForm must be used within ProductFormProvider");
  }
  return context;
};
