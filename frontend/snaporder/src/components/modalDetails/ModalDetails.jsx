import "./ModalDetails.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useEffect } from "react";

function ModalDetails({ open, onClose, idOrdine }) {
  const [type, setType] = useState("cibo");
  const [element, setElement] = useState([]); //elenco cibo
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState("");
  const [qta, setQta] = useState(1);
  const [priceProd, setPriceProd] = useState("");
  const [typeProd, setTypeProd] = useState("cibo");

  //Lettura prodotti -cibi-bevande-tutti------------------
  const handleShowProduct = async () => {
    try {
      if (type === "cibo") {
        const res = await axios.get("http://127.0.0.1:3000/prodotti/cibi");
        if (res.data.length >= 1) {
          setElement(res.data);
          console.log(element);
        } else {
          console.log("nessun cibo trovato");
        }
      }
      if (type === "bevanda") {
        const res = await axios.get("http://127.0.0.1:3000/prodotti/bevande");
        if (res.data.length >= 1) {
          setElement(res.data);
          console.log(element);
        } else {
          console.log("nessuna bevanda trovata");
        }
      }
    } catch (error) {
      console.error("errore", error);
    }
  };
  //--------------------------------------------------------------------
  //handlesubmit per inserimento dettaglio------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ins = await axios.post(
        "http://127.0.0.1:3000/dettagli_ordinazione/",
        {
          id_ordinazione: idOrdine,
          id_prodotto: selectedProduct.id_prodotto,
          quantita: qta,
          prezzo_unitario: selectedProduct.prezzo_unitario,
          subtotale: qta * selectedProduct.prezzo_unitario,
        },
      );
      console.log("Dettaglio inserito", ins.data);
      onClose();
    } catch (error) {
      console.error("Errore inserimento dettaglio", error);
    }
  };
  //--------------------------------------------------------------------
  useEffect(() => {
      handleShowProduct();
  }, [open,type]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Aggiungi </DialogTitle>

        <DialogContent>
          <form id="subscription-form" onSubmit={handleSubmit}>
            <InputLabel id="demo-simple-select-label">
              Cibo/Bevanda/Personalizzato
            </InputLabel>
            <Select
              className="select-type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Age"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem sx={{ color: "blue" }} value={"cibo"}>
                Cibo
              </MenuItem>
              <MenuItem sx={{ color: "green" }} value={"bevanda"}>
                Bevanda
              </MenuItem>
              <MenuItem sx={{ color: "red" }} value={"pers"}>
                Personalizzato
              </MenuItem>
            </Select>
            {(type === "cibo" || type === "bevanda") && (
              <Autocomplete
                className="select-type"
                disablePortal
                options={element}
                value={selectedProduct}
                onChange={(event, newValue) => setSelectedProduct(newValue)}
                getOptionLabel={(option) => option.nome || ""}
                getOptionKey={(option) => option.id_prodotto}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Prodotto" />
                )}
              />
            )}
            {type === "pers" && (
              <>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="text"
                  label="Nome prodotto"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={""}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="prezzo"
                  name="email"
                  label="Prezzo unitario"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={priceProd}
                  onChange={(e) => setPriceProd(e.target.value)}
                />
                <InputLabel id="demo-simple-select-label">
                  Cibo / Bevanda
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="gdfhfrhfdghfdgjhgfhdf"
                  sx={{ minWidth: 250 }}
                  value={typeProd}
                  onChange={(e) => setTypeProd(e.target.value)}
                >
                  <MenuItem value="cibo">Cibo</MenuItem>
                  <MenuItem value="bevanda">Bevanda</MenuItem>
                </Select>
              </>
            )}

            <label className="label-number">Quantità</label>
            <input
              type="number"
              className="input-number qta"
              min={1}
              max={20}
              defaultValue={1}
              value={qta}
              onChange={(e) => setQta(e.target.value)}
            ></input>

            <DialogActions>
              <Button onClick={onClose}>Indietro</Button>
              <Button type="submit" form="subscription-form">
                Aggiungi
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default ModalDetails;
