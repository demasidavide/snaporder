import "./ModalOrder.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState } from "react";

function ModalOrder({ open, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ciao");
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Aggiungi </DialogTitle>
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
              value={""}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="label-number">Persone</label>
            <input
              type="number"
              className="input-number"
              min={1}
              max={20}
              defaultValue={1}
              value={""}
              onChange={(e) => setNumPosti(e.target.value)}
            ></input>
            <InputLabel id="demo-simple-select-label">Posizione</InputLabel>
            <Select
              className="select-posizione"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={""}
              label="Age"
              onChange={(e) => setPosition(e.target.value)}
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
export default ModalOrder;
