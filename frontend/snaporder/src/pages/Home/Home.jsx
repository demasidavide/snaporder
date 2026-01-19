import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import CardTable from "../../components/cardTable/CardTable";
import { useState } from "react";

function Home() {
  const [selectArea, setSelectArea] = useState("Tavoli"); //stato passato da navbar

  return (
    <>
      <Navbar selectArea={selectArea} setSelectArea={setSelectArea}></Navbar>
    <div className="container-main">
    <CardTable></CardTable>
    <CardTable></CardTable>
    

    </div>



    </>
  );
}

export default Home;
