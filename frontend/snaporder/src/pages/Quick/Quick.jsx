import "./Quick.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ForwardIcon from "@mui/icons-material/Forward";

function Quick() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);
  const [order, setOrder] = useState({
    id: "",
    created: false,
  });

  const handelOrder = async () => {
    try {
      const ins = await axios.post("http://127.0.0.1:3000/ordinazioni", {
        id_utente: 1,
        numero_persone: 1,
        stato: "aperta",
        nome_ordine: "veloce",
        posizione: "sotto",
      });
      return ins.data.id_ordinazione;
    } catch (error) {
      console.error("impossibile aggiungere ordine veloce", error);
    }
  };

  const deleteOrder = async () => {
    try {
      const del = await axios.delete(
        `http://127.0.0.1:3000/ordinazioni/${order.id}`,
      );
      console.log("ordinazione cancellata", order.Id);
    } catch (error) {
      console.error("ordine non cancellato", error);
    }
  };

  return (
    <>
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
                  console.log(id)
                } catch (e) {
                  console.log("errore await")
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
              <Paper sx={{ height: 300, width: "100%" }}>
                <DataGrid
                  columns={[
                    { field: "prodotto", headerName: "Prodotto", width: 150 },
                    { field: "quantita", headerName: "Quantità", width: 100 },
                    { field: "prezzo", headerName: "Prezzo", width: 100 },
                  ]}
                  hideFooter={true}
                  paginationModel={{ pageSize: 100, page: 0 }}
                  pageSizeOptions={[100]}
                  checkboxSelection
                  sx={{ border: 0 }}
                />
              </Paper>
              <div className="container-selection">
                <span className="fd">
                  <Autocomplete
                    className="select-food-drink"
                    disablePortal
                    options={""}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Cibo" />
                    )}
                  />
                  <svg className="plus-one">
                    <PlusOneIcon></PlusOneIcon>
                  </svg>
                </span>
                <span className="fd">
                  <Autocomplete
                    className="select-food-drink"
                    disablePortal
                    options={""}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Bevanda" />
                    )}
                  />
                  <svg className="plus-one">
                    <PlusOneIcon></PlusOneIcon>
                  </svg>
                </span>
              </div>
              <TextField
                className="text-parziale veloce"
                id="outlined-read-only-input"
                label="Totale"
                value="10€"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
              <TextField
                className="text-parziale veloce"
                id="outlined-read-only-input"
                label="Totale"
                value="10€"
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
              />
              <Button
                type="submit"
                className="submit-cash quick-page"
                variant="contained"
                color="success"
              >
                Paga
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
export default Quick;
