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
import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import { useState, UseEffect } from "react";
import { useEffect } from "react";

function ProductList() {
  const [selectedType, setSelectedType] = useState("Bevande");
  const [openModal, setOpenModal] = useState(false);
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [nameProd, setNameProd] = useState("");
  const [descProd, setDescProd] = useState("");
  const [priceProd, setPriceProd] = useState("");
  const [typeProd, setTypeProd] = useState("");

  useEffect(()=>{
    handleShowProduct();
  },[selectedType,openModal])


  //handle per gestire selezione bevande/cibo----------
  const handleTypeChange = (e, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
      console.log(newType);
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
  //Lettura prodotti -cibi-bevande-tutti------------------
  const handleShowProduct = async()=>{
    try{
      if(selectedType === "Cibo"){
        const res = await axios.get("http://127.0.0.1:3000/prodotti/cibi");
        if(res.data.length >= 1){
          setFood(res.data);
        }else{
          console.log("nessun cibo trovato")
        }
      }
      if(selectedType === "Bevande"){
        const res = await axios.get("http://127.0.0.1:3000/prodotti/bevande");
        if(res.data.length >= 1){
          setDrink(res.data);
        }else{
          console.log("nessuna bevanda trovata")
        }
      }
      if(selectedType === "Tutti"){
        const res = await axios.get("http://127.0.0.1:3000/prodotti/");
        if(res.data.length >= 1){
          setAllProducts(res.data);
        }else{
          console.log("nessun all trovato")
        }
      }
    }catch(error){
      console.error("errore",error)
    }
  }
  //--------------------------------------------------------------------
  //Aggiunta nuovo prodotto---------------------------------------------
  const handleNewProd = async(e)=>{
    e.preventDefault();
    try{
      const ins = await axios.post("http://127.0.0.1:3000/prodotti/",{
        nome : nameProd, 
        descrizione : descProd, 
        prezzo_unitario : priceProd, 
        tipo_prodotto : typeProd, 
      })
      console.log(ins);
      handleCloseModal();
    }catch(error){
      console.log(error)
    }
  }
  //---------------------------------------------------------------------


  return (
    <>
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
        <Fab onClick={handleOpenModal} className="add" color="primary" aria-label="add">
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
              onChange={(e)=>setNameProd(e.target.value)}
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
              onChange={(e)=>setDescProd(e.target.value)}
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
              onChange={(e)=>setPriceProd(e.target.value)}
            />
            <InputLabel id="demo-simple-select-label">Cibo / Bevanda</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="gdfhfrhfdghfdgjhgfhdf"
          sx={{ minWidth: 250 }}
          value={typeProd}
          onChange={(e)=>setTypeProd(e.target.value)}
        >
          <MenuItem value="cibo">Cibo</MenuItem>
          <MenuItem value="Bevanda">Bevanda</MenuItem>
        </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Indietro</Button>
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
            {selectedType === "Cibo" && (
              (food.map((f)=>(
               <TableRow
               key={f.id_prodotto}>
              <TableCell>{f.nome}</TableCell>
              <TableCell>{f.prezzo_unitario}</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow> 
              ))
            ))}
            {selectedType === "Bevande" && (
              (drink.map((d)=>(
               <TableRow
               key={d.id_prodotto}>
              <TableCell>{d.nome}</TableCell>
              <TableCell>{d.prezzo_unitario}</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow> 
              ))
            ))}
            {selectedType === "Tutti" && (
              (allProducts.map((a)=>(
               <TableRow
               key={a.id_prodotto}>
              <TableCell>{a.nome}</TableCell>
              <TableCell>{a.prezzo_unitario}</TableCell>
              <TableCell>
                <DeleteIcon />
              </TableCell>
            </TableRow> 
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default ProductList;
