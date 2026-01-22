import "./Order.css";
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
import EuroIcon from "@mui/icons-material/Euro";
import { useState } from "react";

function Order() {
  const [selectedType, setSelectedType] = useState("Cibo");
  const [openModal, setOpenModal] = useState(false);
  //handle per gestire selezione bevande/cibo
  const handleTypeChange = (e, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
      console.log(newType);
    }
  };
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
          className={selectedType === "Cibo" ? "type" : "type-selected"}
          value="Bevande"
        >
          Bevande
        </ToggleButton>
      </ToggleButtonGroup>
      <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Descrizione</TableCell>
            <TableCell align="left">Q.ta</TableCell>
            <TableCell align="right"></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Acqua naturale</TableCell>
            <TableCell align="left">2</TableCell>
            <TableCell align="right">erer</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="container-add">
        <Fab onClick="" className="add-order" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab variant="extended">
          <EuroIcon sx={{ mr: 1 }} />
          Paga
        </Fab>
      </div>
    </>
  );
}
export default Order;
