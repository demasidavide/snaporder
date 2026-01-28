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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import EuroIcon from "@mui/icons-material/Euro";
import CloseIcon from "@mui/icons-material/Close";
import ModalDetails from "../../components/modalDetails/ModalDetails";
import ModalOrder from "../../components/modalOrder/ModalOrder";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ModalDelete from "../../components/modalDelete/ModalDelete";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const idOrdine = location.state?.id;
  const [openAlert, setOpenAlert] = useState(false); //apertura alert cancellazione
  const [selectedType, setSelectedType] = useState("Cibo");
  const [openModalOrder, setOpenModalOrder] = useState(false);
  const [details, setDetails] = useState([]);
  const [idToDelMod, setIdToDelMod] = useState(); //id da cancellare o modificare
  const [prodSelected, setProdSelected] = useState([]); //dati di un singolo prodotto

  useEffect(() => {
    handleDetails();
  }, [openModalOrder, selectedType]);

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
  //handle per aprire la modale di inserimento dettaglio
  const handleOpenModal = () => {
    setOpenModalOrder(true);
  };
  //---------------------------------------------------
  //handle per chiudere la modale di inserimento dettaglio
  const handleCloseModal = () => {
    setOpenModalOrder(false);
  };
  //-------------------------------------------------------
  //handle per gestire selezione bevande/cibo--------------
  const handleTypeChange = (e, newType) => {
    if (newType !== null) {
      setSelectedType(newType);
      console.log(newType);
    }
  };
  //------------------------------------------------------
  //handle per popolare la tabella dettagli ordine-------------------
  const handleDetails = async () => {
    try {
      if (selectedType === "Bevande") {
        const res = await axios.get("http://127.0.0.1:3000/dettagli/drink");
        setDetails(res.data);
      } else {
        const res = await axios.get("http://127.0.0.1:3000/dettagli/food");
        setDetails(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error("impossibile recuperare dettagli", error);
    }
  };
  //------------------------------------------------------------------
  //handle per cancellare dettaglio-----------------------------------
  const handleDelete = async (id) => {
    try {
      console.log(id);
      const del = await axios.delete(`http://127.0.0.1:3000/dettagli/${id}`);
      console.log("cancellazione ok di", id);
      handleDetails();
      handleCloseAlert();
    } catch (error) {
      console.error("Impossibile cancellare f", error);
    }
  };
  //------------------------------------------------------------------

  return (
    <>
      {/* modale di cancellazione */}
      <ModalDelete
        open={openAlert}
        onClose={handleCloseAlert}
        name={prodSelected.map((p) => p.nome)}
        onDelete={()=>handleDelete(idToDelMod)}
      ></ModalDelete>
      {/* fine modale cancellazione */}
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
      <svg className="close" onClick={() => navigate("/home")}>
        <CloseIcon></CloseIcon>
      </svg>
      <ModalDetails
        open={openModalOrder}
        onClose={handleCloseModal}
        idOrdine={idOrdine}
      />
      <Table
        className="table-body-order"
        sx={{ minWidth: 250 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Descrizione</TableCell>
            <TableCell align="left">Q.ta</TableCell>
            <TableCell align="right">Azioni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((d) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {d.nome_prodotti}
              </TableCell>
              <TableCell align="left">{d.quantita}</TableCell>
              <TableCell align="right">
                <ModeIcon className="mod"></ModeIcon>
                <DeleteIcon className="delete" onClick={()=> handleOpenAlert(d.id_dettaglio,d.nome_prodotti)}></DeleteIcon>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="container-add">
        <Fab
          onClick={() => setOpenModalOrder(!openModalOrder)}
          className="add-order"
          color="primary"
          aria-label="add"
        >
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
