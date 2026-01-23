import "./ModalTable.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";
import { use } from "react";

function ModalTable({ open, onClose }) {

  const [ position, setPosition ] = useState("dentro");
  const [ name, setName ] = useState("");
  const [ numPosti, setNumPosti ] = useState(1);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
    const res = axios.post('http://127.0.0.1:3000/tavoli/', { nome: name,numPosti:numPosti });
    console.log(res.data);
    }catch(error){
      console.error("Errore inserimento tavolo",error);

    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Aggiungi tavolo</DialogTitle>
        <DialogContent>
          <form id="subscription-form" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="Nome tavolo"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <label className="label-number">Persone</label>
            <input
              type="number"
              className="input-number"
              min={1}
              max={20}
              defaultValue={1}
              value={numPosti}  
  onChange={(e) => setNumPosti(e.target.value)}
            ></input>
            <InputLabel id="demo-simple-select-label">Posizione</InputLabel>
            <Select
              className="select-posizione"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={position}
              label="Age"
              onChange={(e)=>setPosition(e.target.value)}
            >
              <MenuItem sx={{ color: "blue" }} value={"sotto"}>
                Sotto
              </MenuItem>
              <MenuItem sx={{ color: "green" }} value={"sopra"}>
                Sopra
              </MenuItem>
              <MenuItem sx={{ color: "red" }} value={"fuori"}>
                Fuori
              </MenuItem>
            </Select>
            <DialogActions>
              <Button onClick={onClose}>Indietro</Button>
              <Button onClick={onClose} type="submit" form="subscription-form">
                Aggiungi
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalTable;
