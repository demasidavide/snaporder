import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import CardTable from "../../components/cardTable/CardTable";
import ProductList from "../../components/productList/ProductList";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ModalTable from "../../components/modalTable/ModalTable";
import CardCash from "../../components/cardCash/CardCash";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function Home() {
  const location = useLocation();
  const [selectArea, setSelectArea] = useState(
    location.state?.selectArea || "Tavoli",
  ); //stato passato da navbar
  const [openModalAddTable, setOpenModalAddTable] = useState(false);
  const [table, setTable] = useState([]);
  // const { detailsDelay,setDetailsDelay,checkDetails } = useDelayDetails();
//funzione di caricamento dettagli in ritardo----------
// useEffect(() => {
//     let intervalId;
//     if (table.length > 0) {
//       checkDetails(); 
//       intervalId = setInterval(checkDetails, 60000); 
//     }
//     const currentTime = new Date();

//         const updatedOrders = detailsDelay.map((order) => {
//           const orderTime = new Date(order.timestamp); 
//           const diffInMinutes = (currentTime - orderTime) / (1000 * 60); 
//           return {
//             ...order,
//             isOld: diffInMinutes > 5,
//           };
//         });
//         setDetailsDelay(updatedOrders);
      
    
    // Pulizia dell'intervallo
  //   return () => {
  //     if (intervalId) {
  //       clearInterval(intervalId);
  //     }
  //   };
  // }, [table]); // Dipendenza su table
//-----------------------------------------------------
  useEffect(() => {
    handleTable();
  }, [selectArea, openModalAddTable, table]);

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
        <AnimatePresence mode="wait">
          <motion.div
            key={selectArea}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
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
                    id={t.id_ordinazione}
                    
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
                    id={t.id_ordinazione}
                  ></CardCash>
                ))}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default Home;
