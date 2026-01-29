import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import CardTable from "../../components/cardTable/CardTable";
import ProductList from "../../components/productList/ProductList";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import ModalTable from "../../components/modalTable/ModalTable";
import CardCash from "../../components/cardCash/CardCash";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();
  const [selectArea, setSelectArea] = useState(location.state?.selectArea || "Tavoli"); //stato passato da navbar
  const [openModalAddTable, setOpenModalAddTable] = useState(false);
  const [table, setTable] = useState([]);

  useEffect(() => {
    handleTable();
  }, [selectArea,openModalAddTable]);

  //handle per aprire la modale di inserimento tavoli
  const handleOpenModal = () => {
    setOpenModalAddTable(true);
  };
  //---------------------------------------------------
  //handle per chiudere la modale di inserimento tavoli
  const handleCloseModal = () => {
    setOpenModalAddTable(false);
  };
  //----------------------------------------------------
  //GET per popolare cardTable--------------------------
  const handleTable = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:3000/ordinazioni");
      setTable(res.data);
    } catch (error) {
      console.error("Errore nel caricamento dei tavoli:", error);
      setTable([]);
    }
  };
  return (
    <>
      <Navbar selectArea={selectArea} setSelectArea={setSelectArea}></Navbar>
      <div className="container-main">
        {selectArea === "Tavoli" && (
          <>
            <div className="container-add-table">
              <Fab
                onClick={handleOpenModal}
                className="add-table"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
              <ModalTable
                open={openModalAddTable}
                onClose={handleCloseModal}
              ></ModalTable>
            </div>
            {table.map((t) => (
              <CardTable
                key={t.id_ordinazione}
                name={t.nome_ordine}
                num={t.numero_persone}
                located={t.posizione}
                id = {t.id_ordinazione}
              ></CardTable>
            ))}
          </>
        )}
        {selectArea === "Prodotti" && (
          <>
            <ProductList></ProductList>
          </>
        )}
        {selectArea === "Cassa" && (
          <>
            
            {table.map((t) => (
            <CardCash 
            key={t.id_ordinazione}
                name={t.nome_ordine}
                num={t.numero_persone}
                located={t.posizione}
                id = {t.id_ordinazione}
            ></CardCash>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default Home;
