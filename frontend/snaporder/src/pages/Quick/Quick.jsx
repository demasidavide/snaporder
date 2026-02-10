import "./Quick.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import AlertError from "../../components/alertError/AlertError";
import { useAlertError } from "../../hooks/useAlertError";
import AlertConfirm from "../../components/alertConfirm/AlertConfirm";
import { useAlertConfirm } from "../../hooks/useAlertConfirm";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ForwardIcon from "@mui/icons-material/Forward";

function Quick() {
  const navigate = useNavigate();

  // Recupera lo stato da localStorage durante l'inizializzazione
  const [showPage, setShowPage] = useState(() => {
    const saved = localStorage.getItem("orderData");
    if (saved) {
      try {
        const { showPage: savedShowPage } = JSON.parse(saved);
        return savedShowPage || false;
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  const [order, setOrder] = useState(() => {
    const saved = localStorage.getItem("orderData");
    if (saved) {
      try {
        const { order: savedOrder } = JSON.parse(saved);
        return savedOrder || { id: "", created: false };
      } catch (e) {
        return { id: "", created: false };
      }
    }
    return { id: "", created: false };
  });

  const [productList, setProductList] = useState({
    food: [],
    drink: [],
  });
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [list, setList] = useState([]);
  const [toPay, setToPay] = useState(0);
  const total = list.reduce((acc, item) => {
    return acc + parseFloat(item.prezzo);
  }, 0);
  const { alertConfirm, setAlertConfirm, handleAlertConfirm } =
    useAlertConfirm();
  const { alertError, setAlertError, handleAlertError } = useAlertError();

  // Salva lo stato quando cambia
  useEffect(() => {
    console.log("Salvataggio:", { order, showPage });
    localStorage.setItem("orderData", JSON.stringify({ order, showPage }));
  }, [order, showPage]);

  useEffect(() => {
    handleProduct();
    handleDetails();
  }, []);

  //carica cibi----------------------------------------------------------
  const handleProduct = async () => {
    try {
      const [resFood, resDrink] = await Promise.all([
        axios.get("http://127.0.0.1:3000/prodotti/cibi"),
        axios.get("http://127.0.0.1:3000/prodotti/bevande"),
      ]);
      setProductList({
        food: resFood.data,
        drink: resDrink.data,
      });
    } catch (error) {
      console.error("imnpossibile caricare i cibi", error);
    }
  };
  //----------------------------------------------------------------------
  //aggiungi prodotti alla lista------------------------------------------
  const addProduct = async (product) => {
    if (!product) return;
    try {
      const ins = await axios.post("http://127.0.0.1:3000/dettagli", {
        id_ordinazione: order.id,
        id_prodotto: product.id_prodotto,
        quantita: 1,
        prezzo_unitario: product.prezzo_unitario,
        subtotale: product.prezzo_unitario,
        note: "veloce",
      });
      handleDetails();
      console.log(ins.data);
    } catch (error) {
      console.error("impossibile aggiungere prodotto alla lista", error);
    }
  };
  //----------------------------------------------------------------------
  //aggiornamento lista prodotti inseriti---------------------------------
  const handleDetails = async () => {
    if (!showPage) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:3000/dettagli/pay/${order.id}`,
      );
      const resData = res.data.map((r) => ({
        id_dettaglio: r.id_dettaglio,
        prodotto: r.nome_prodotti,
        quantita: r.quantita,
        prezzo: r.prezzo_unitario,
      }));
      setList(resData);
      console.log(resData);
    } catch (error) {
      console.error("impossibile caricare dettagli ordine", error);
    }
  };
  //----------------------------------------------------------------------
  //crea tavolo veloce e lo mostra subito---------------------------------
  const handelOrder = async () => {
    try {
      const ins = await axios.post("http://127.0.0.1:3000/ordinazioni", {
        id_utente: 1,
        numero_persone: 1,
        stato: "aperta",
        nome_ordine: "veloce",
        posizione: "sotto",
      });
      console.log(ins.data);
      return ins.data.id_ordinazione;
    } catch (error) {
      console.error("impossibile aggiungere ordine veloce", error);
    }
  };
  //----------------------------------------------------------------------
  //cancellazione riga singola--------------------------------------------
  const handleDeleteRow = async (id) => {
    try {
      const del = await axios.delete(`http://127.0.0.1:3000/dettagli/${id}`);
      console.log(del.data);
      handleDetails();
    } catch (error) {
      console.error("impossibile cancellare dettaglio", error);
    }
  };
  //----------------------------------------------------------------------
  //cancellazione ordine appena creato------------------------------------
  const deleteOrder = async () => {
    try {
      const del = await axios.delete(
        `http://127.0.0.1:3000/ordinazioni/${order.id}`,
      );
      setOrder({ id: "", created: false });
      setShowPage(false);
      localStorage.removeItem("orderData");
      console.log("ordinazione cancellata", order.id);
    } catch (error) {
      console.error("ordine non cancellato", error);
    }
  };
  //-----------------------------------------------------------------------
  //submit per inserimento scontrino,eliminazione ordine da localstorage e back alla home
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ins = await axios.post("http://127.0.0.1:3000/scontrini", {
        id_ordinazione: order.id,
        totale_pagato: toPay,
      });
      handleAlertConfirm("Ordine saldato!")
      console.log(ins.data);

      setTimeout(() => {
      localStorage.removeItem("orderData");
      navigate("/home");
    }, 2000);
      
    } catch(error){
      console.error("impossibile saldae l ordine", error);
      handleAlertError("Errore - Saldo non riuscito")
    }
  };
  //------------------------------------------------------------------------
  return (
    <>
    <AlertError
            open={alertError.open}
            onClose={() => setAlertError({ open: false, message: "" })}
            message={alertError.message}
          ></AlertError>
          <AlertConfirm
            open={alertConfirm.open}
            onClose={() => setAlertConfirm({ open: false, message: "" })}
            message={alertConfirm.message}
          ></AlertConfirm>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {order.created ? (
            <svg
              className="close"
              onClick={() => {
                deleteOrder();
                navigate("/home");
              }}
            >
              <DeleteOutlineIcon></DeleteOutlineIcon>
            </svg>
          ) : (
            <svg
              className="close"
              onClick={() => {
                navigate("/home");
              }}
            >
              <ForwardIcon></ForwardIcon>
            </svg>
          )}

          <div className="container-add-table">
            <Fab
              className="add-table"
              color="primary"
              aria-label="add"
              onClick={async () => {
                try {
                  const id = await handelOrder();
                  setOrder({ created: true, id });
                  setShowPage(true);
                } catch (e) {
                  console.log("errore await");
                }
              }}
            >
              <AddIcon />
            </Fab>
          </div>
          {showPage && (
            <motion.div
              className="container-page"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <form on onSubmit={handleSubmit}>
                <Paper sx={{ height: 300, width: "100%" }}>
                  <DataGrid
                    rows={list}
                    columns={[
                      { field: "prodotto", headerName: "Prodotto", width: 200 },
                      //{ field: "quantita", headerName: "Quantità", width: 100 },
                      { field: "prezzo", headerName: "Prezzo", width: 100 },
                      {
                        field: "actions",
                        headerName: "Azioni",
                        width: 100,
                        sortable: false,
                        renderCell: (params) => (
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDeleteRow(params.row.id_dettaglio)
                            }
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        ),
                      },
                    ]}
                    getRowId={(row) => row.id_dettaglio}
                    hideFooter={true}
                    paginationModel={{ pageSize: 100, page: 0 }}
                    pageSizeOptions={[100]}
                    sx={{ border: 0 }}
                  />
                </Paper>
                <div className="container-selection">
                  <span className="fd" style={{ marginBottom: "10px" }}>
                    <Autocomplete
                      className="select-food-drink"
                      disablePortal
                      options={productList.food}
                      getOptionLabel={(option) => option.nome}
                      sx={{ width: 300 }}
                      value={selectedFood}
                      onChange={(event, newValue) => {
                        setSelectedFood(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Cibo" />
                      )}
                    />
                    <IconButton
                      onClick={() => addProduct(selectedFood)}
                      sx={{
                        width: "20%",
                        height: "55px",
                        border: "2px solid var(--confirm)",
                        borderRadius: "8px",
                      }}
                    >
                      <PlusOneIcon></PlusOneIcon>
                    </IconButton>
                  </span>
                  <span className="fd">
                    <Autocomplete
                      className="select-food-drink"
                      disablePortal
                      options={productList.drink}
                      getOptionLabel={(option) => option.nome}
                      sx={{ width: 300 }}
                      value={selectedDrink}
                      onChange={(event, newValue) => {
                        setSelectedDrink(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Bevanda" />
                      )}
                    />
                    <IconButton
                      onClick={() => addProduct(selectedDrink)}
                      sx={{
                        width: "20%",
                        height: "55px",
                        border: "2px solid var(--confirm)",
                        borderRadius: "8px",
                      }}
                    >
                      <PlusOneIcon></PlusOneIcon>
                    </IconButton>
                  </span>
                </div>
                <TextField
                  className="text-parziale veloce"
                  id="outlined-read-only-input"
                  label="Totale"
                  value={`${total.toFixed(2)}€`}
                  sx={{ width: "30%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <TextField
                  type="number"
                  className="text-payment quick-balance"
                  id="outlined-basic"
                  label="Inserisci Saldo"
                  variant="outlined"
                  margin="normal"
                  value={toPay}
                  onChange={(e)=>setToPay(e.target.value)}
                />
                <Button
                  type="submit"
                  className="submit-cash quick-page"
                  variant="contained"
                  color="success"
                >
                  Paga
                </Button>
              </form>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
export default Quick;
