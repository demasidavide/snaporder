import { useContext, useState } from "react";
import { createContext } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [food, setFood] = useState([]); //elenco cibo
  const [drink, setDrink] = useState([]); //elenco bevande
  const [allProducts, setAllProducts] = useState([]); //tutti i prodotti
  const [menuProducts, setMenuProducts] = useState([]); //prodotti del menu

  return (
    <ProductContext.Provider
      value={{
        food,
        setFood,
        drink,
        setDrink,
        allProducts,
        setAllProducts,
        menuProducts,
        setMenuProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export const useProductContext = ()=> useContext(ProductContext);