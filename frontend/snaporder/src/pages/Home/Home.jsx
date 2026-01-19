import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import CardTable from "../../components/cardTable/CardTable";
import ProductList from "../../components/productList/ProductList";
import { useState } from "react";

function Home() {
  const [selectArea, setSelectArea] = useState("Tavoli"); //stato passato da navbar

  return (
    <>
      <Navbar selectArea={selectArea} setSelectArea={setSelectArea}></Navbar>
      <div className="container-main">
        {selectArea === "Tavoli" && (
          <>
            <CardTable></CardTable>
            <CardTable></CardTable>
          </>
        )}
        {selectArea === "Prodotti" && (
            <>
            <ProductList></ProductList>
            </>
        )}
      </div>
    </>
  );
}

export default Home;
