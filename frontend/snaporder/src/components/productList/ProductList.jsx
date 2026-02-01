import "./ProductList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ModeIcon from "@mui/icons-material/Mode";
import ModalDelete from "../modalDelete/ModalDelete";
import AlertConfirm from "../alertConfirm/AlertConfirm";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { useState, useEffect } from "react";

function ProductList() {
  const [openAlert, setOpenAlert] = useState(false); //apertura alert cancellazione
  const [openModal, setOpenModal] = useState(false); //apertura modale add prodotti
  const [openModalMod, setOpenModalMod] = useState(false); //apertura modale modifica prodotti
  const [selectedType, setSelectedType] = useState("Cibo"); //selezione tipo da visualizzare
  const [food, setFood] = useState([]); //elenco cibo
  const [drink, setDrink] = useState([]); //elenco bevande
  const [allProducts, setAllProducts] = useState([]); //tutti i prodotti
  const [nameProd, setNameProd] = useState(""); //nome nuovo prodotto
  const [descProd, setDescProd] = useState(""); //descrizione nuovo prodotto
  const [priceProd, setPriceProd] = useState(""); //prezzo nuovo prodotto
  const [typeProd, setTypeProd] = useState(""); //tipo nuovo prodotto
  const [modData, setModData] = useState({
    nome: "",
    descrizione: "",
    prezzo: "",
    tipo: "",
  });
  const [idToDelMod, setIdToDelMod] = useState(); //id da cancellare o modificare
  const [prodSelected, setProdSelected] = useState([]); //dati di un singolo prodotto
  const [alertConfirm, setAlertConfirm] = useState({open:false, message:""});//stato per alert conferma

  useEffect(() => {
    handleShowProduct();
  }, [selectedType, openModal]);

//gestione per apertura alert di  conferma prodotto inserito--
const handleAlertConfirm = (message)=>{
   setAlertConfirm({open:true, message: message});
  setTimeout(() => setAlertConfirm({open:false, message:""}), 2000);
}
//-----------------------------------------------------------
  //gestione apertura alert cancellazione---------------
  const handleOpenAlert = (id, nome) => {
    setIdToDelMod(id);
    setProdSelected([{ nome }]);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setIdToDelMod();
  };
  //---------------------------------------------------
  //handle per gestire selezione bevande/cibo----------
  const handleTypeChange = (e, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
    }
  };
  //----------------------------------------------------
  //handle per aprire la modale di inserimento porodotti
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  //------------------------------------------------------
  //handle per chiudere la modale di inserimento porodotti
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  //------------------------------------------------------
  //handle per aprire la modale di modifica porodotti
  const handleOpenModalMod = (id, nome, descrizione, prezzo, tipo) => {
    setIdToDelMod(id);
    setModData({
      nome: nome,
      descrizione: descrizione,
      prezzo: prezzo,
      tipo: tipo,
    });
    setOpenModalMod(true);
  };
  //------------------------------------------------------
  //handle per chiudere la modale di modifica porodotti
  const handleCloseModalMod = () => {
    setOpenModalMod(false);
  };
  //------------------------------------------------------
  //Lettura prodotti -cibi-bevande-tutti------------------
  const handleShowProduct = async () => {
    try {
      if (selectedType === "Cibo") {
        const res = await axios.get("http://127.0.0.1:3000/prodotti/cibi");
        if (res.data.length >= 1) {
          setFood(res.data);
        } else {
          console.log("nessun cibo trovato");
        }
      }
      if (selectedType === "Bevande") {
        const res = await axios.get("http://127.0.0.1:3000/prodotti/bevande");
        if (res.data.length >= 1) {
          setDrink(res.data);
        } else {
          console.log("nessuna bevanda trovata");
        }
      }
      if (selectedType === "Tutti") {
        const res = await axios.get("http://127.0.0.1:3000/prodotti/");
        if (res.data.length >= 1) {
          setAllProducts(res.data);
        } else {
          console.log("nessun all trovato");
        }
      }
    } catch (error) {
      console.error("errore", error);
    }
  };
  //--------------------------------------------------------------------
  //Aggiunta nuovo prodotto---------------------------------------------
  const handleNewProd = async (e) => {
    e.preventDefault();
    try {
      const ins = await axios.post("http://127.0.0.1:3000/prodotti/", {
        nome: nameProd,
        descrizione: descProd,
        prezzo_unitario: priceProd,
        tipo_prodotto: typeProd,
      });
      handleAlertConfirm("Prodotto inserito");
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------------------------------------------
  //Cancella prodotto----------------------------------------------------
  const handleDelete = async () => {
    try {
      const del = await axios.delete(
        `http://127.0.0.1:3000/prodotti/${idToDelMod}`,
      );
      console.log(del.status);
      handleAlertConfirm("Prodotto cancellato")
      handleCloseAlert();
      handleShowProduct();
    } catch (error) {
      console.error("Errore nella cancellazione", error);
    }
  };
  //---------------------------------------------------------------------
  //Modifica prodotto----------------------------------------------------
  const handleModProd = async (e) => {
    e.preventDefault();
    try {
      const mod = await axios.put(
        `http://127.0.0.1:3000/prodotti/${idToDelMod}`,
        {
          nome: modData.nome,
          descrizione: modData.descrizione,
          prezzo_unitario: modData.prezzo,
          tipo_prodotto: modData.tipo,
        });
        console.log(mod.status,`modifica effettuata con id ${idToDelMod}`)
        handleShowProduct();
        handleAlertConfirm("Prodotto modificato");
        handleCloseModalMod();
    } catch (error) {
      console.error("Modifica non riuscita", error);
    }
  };

  return (
    <>
    <AlertConfirm
    open = {alertConfirm.open}
    onClose={()=>setAlertConfirm({open:false, message:""})}
    message={alertConfirm.message}
    >
    </AlertConfirm>
      {/* inizio modale cancellazione */}
      <ModalDelete
      open={openAlert}
      onClose={handleCloseAlert}
      name={prodSelected.map((p) => p.nome)}
      onDelete={handleDelete}
      ></ModalDelete>
      {/* Fine modale cancellazione */}
      {/* Inizio modale modifica */}
      <Dialog open={openModalMod} onClose={handleCloseModalMod}>
        <DialogTitle>Modifica prodotto</DialogTitle>
        <DialogContent>
          <form id="subscription-form" onSubmit={handleModProd}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="Modifica nome"
              type="text"
              fullWidth
              variant="standard"
              value={modData.nome}
              onChange={(e) => setModData({...modData, nome: e.target.value})}
            />
            <TextField
              autoFocus
              margin="dense"
              id="descrizione"
              name="descrizione"
              label="Modifica descrizione"
              type="text"
              fullWidth
              variant="standard"
              value={modData.descrizione}
              onChange={(e) => setModData({...modData, descrizione: e.target.value})}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="prezzo"
              name="email"
              label="Modifica prezzo"
              type="number"
              fullWidth
              variant="standard"
              value={modData.prezzo}
              onChange={(e) => setModData({...modData, prezzo: e.target.value})}
            />
            <InputLabel id="demo-simple-select-label">
              Cibo / Bevanda
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Seleziona tipo"
              sx={{ minWidth: 250 }}
              value={modData.tipo}
              onChange={(e) => setModData({...modData, tipo: e.target.value})}
            >
              <MenuItem value="cibo">Cibo</MenuItem>
              <MenuItem value="bevanda">Bevanda</MenuItem>
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModalMod()}>Indietro</Button>
          <Button type="submit" form="subscription-form">
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
      {/* Fine modale modifica */}
      <ToggleButtonGroup
        onChange={handleTypeChange}
        exclusive
        aria-label="Platform"
      >
        <ToggleButton
          className={selectedType === "Cibo" ? "type-selected" : "type"}
          value="Cibo"
        >
          Cibo
        </ToggleButton>
        <ToggleButton
          className={selectedType === "Bevande" ? "type-selected" : "type"}
          value="Bevande"
        >
          Bevande
        </ToggleButton>
        <ToggleButton
          className={selectedType === "Tutti" ? "type-selected" : "type"}
          value="Tutti"
        >
          Tutti
        </ToggleButton>
        <Fab
          onClick={handleOpenModal}
          className="add"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Aggiungi prodotto</DialogTitle>
          <DialogContent>
            <form id="subscription-form" onSubmit={handleNewProd}>
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
                value={nameProd}
                onChange={(e) => setNameProd(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="descrizione"
                name="descrizione"
                label="Descrizione --opzionale--"
                type="text"
                fullWidth
                variant="standard"
                value={descProd}
                onChange={(e) => setDescProd(e.target.value)}
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
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseModal()}>Indietro</Button>
            <Button type="submit" form="subscription-form">
              Aggiungi
            </Button>
          </DialogActions>
        </Dialog>
      </ToggleButtonGroup>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Prezzo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedType === "Cibo" &&
              food.map((f) => (
                <TableRow key={f.id_prodotto}>
                  <TableCell>{f.nome}</TableCell>
                  <TableCell>€ {f.prezzo_unitario}</TableCell>
                  <TableCell>
                    <ModeIcon
                    className="mod"
                      onClick={() =>
                        handleOpenModalMod(
                          f.id_prodotto,
                          f.nome,
                          f.descrizione,
                          f.prezzo_unitario,
                          f.tipo_prodotto,
                        )
                      }
                    ></ModeIcon>
                    <DeleteIcon
                      onClick={() => handleOpenAlert(f.id_prodotto, f.nome)}
                      className="delete"
                    />
                  </TableCell>
                </TableRow>
              ))}
            {selectedType === "Bevande" &&
              drink.map((d) => (
                <TableRow key={d.id_prodotto}>
                  <TableCell>{d.nome}</TableCell>
                  <TableCell>€ {d.prezzo_unitario}</TableCell>
                  <TableCell>
                    <ModeIcon
                    onClick={() =>
                        handleOpenModalMod(
                          d.id_prodotto,
                          d.nome,
                          d.descrizione,
                          d.prezzo_unitario,
                          d.tipo_prodotto,
                        )
                      }></ModeIcon>
                    <DeleteIcon
                      onClick={() => handleOpenAlert(d.id_prodotto, d.nome)}
                      className="delete"
                    />
                  </TableCell>
                </TableRow>
              ))}
            {selectedType === "Tutti" &&
              allProducts.map((a) => (
                <TableRow key={a.id_prodotto}>
                  <TableCell>{a.nome}</TableCell>
                  <TableCell>€ {a.prezzo_unitario}</TableCell>
                  <TableCell>
                    <ModeIcon
                    onClick={() =>
                        handleOpenModalMod(
                          a.id_prodotto,
                          a.nome,
                          a.descrizione,
                          a.prezzo_unitario,
                          a.tipo_prodotto,
                        )
                      }></ModeIcon>
                    <DeleteIcon
                      onClick={() => handleOpenAlert(a.id_prodotto, a.nome)}
                      className="delete"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ProductList;
