import { useProductContext } from "../../context/ProductContext";
import axios from "axios";

export function useFetchProducts() {
  const { setFood, setDrink, setAllProducts } = useProductContext();

  const fetchAll = async () => {
    try {
      const [cibi, bevande, tutti] = await Promise.all([
        axios.get("http://127.0.0.1:3000/prodotti/cibi"),
        axios.get("http://127.0.0.1:3000/prodotti/bevande"),
        axios.get("http://127.0.0.1:3000/prodotti/"),
      ]);
      if (cibi.data.length >= 1) setFood(cibi.data);
      if (bevande.data.length >= 1) setDrink(bevande.data);
      if (tutti.data.length >= 1) setAllProducts(tutti.data);
    } catch (error) {
      console.error("errore fetch prodotti", error);
    }
  };

  return { fetchAll };
}