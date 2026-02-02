import "./Order.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EuroIcon from "@mui/icons-material/Euro";
import CloseIcon from "@mui/icons-material/Close";
import ModalDetails from "../../components/modalDetails/ModalDetails";
import TextField from "@mui/material/TextField";
import ModalDelete from "../../components/modalDelete/ModalDelete";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import AlertError from "../../components/alertError/AlertError";
import { useAlertError } from "../../hooks/useAlertError";
import AlertConfirm from "../../components/alertConfirm/AlertConfirm";
import { useAlertConfirm } from "../../hooks/useAlertConfirm";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const idOrdine = location.state?.id;
  console.log(idOrdine);
  const [openAlert, setOpenAlert] = useState(false); //apertura alert cancellazione
  const [openModalMod, setOpenModalMod] = useState(false); //apertura modale modifica prodotti
  const [selectedType, setSelectedType] = useState("Cibo");
  const [openModalOrder, setOpenModalOrder] = useState(false);
  const [details, setDetails] = useState([]);
  const [idToDelMod, setIdToDelMod] = useState(); //id da cancellare o modificare
  const [prodSelected, setProdSelected] = useState([]); //dati di un singolo prodotto
  const [modData, setModData] = useState({
    id: "",
    nome: "",
    note: "",
    qta: "",
  });
  const [selectedRows, setSelectedRows] = useState(() => {
    const saved = localStorage.getItem("selectedRows");
    return saved ? JSON.parse(saved) : [];
  });
  const { alertConfirm, setAlertConfirm, handleAlertConfirm } =
    useAlertConfirm();
  const { alertError, setAlertError, handleAlertError } = useAlertError();

  useEffect(() => {
    handleDetails();
  }, [openModalOrder, selectedType]);

  //useEffect per salvare i selezionati-------------------------------
  //valutare salvataggio in db
  useEffect(() => {
    localStorage.setItem("selectedRows", JSON.stringify(selectedRows));
  }, [selectedRows]);
  //-------------------------------------------------------------------
  //Gestione selezione righe selezionate e salvataggio-----------------
  const handleRowClick = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  //-------------------------------------------------------------------
  //gestione apertura alert cancellazione------------------------------
  const handleOpenAlert = (id, nome) => {
    setIdToDelMod(id);
    setProdSelected([{ nome }]);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setIdToDelMod();
  };
  //-------------------------------------------------------------------
  //handle per aprire la modale di modifica porodotti------------------
  const handleOpenModalMod = (id, nome, note, qta) => {
    setIdToDelMod(id);
    setModData({
      nome: nome,
      note: note,
      quantita: qta,
    });
    setOpenModalMod(true);
  };
  //-------------------------------------------------------------------
  //handle per chiudere la modale di modifica porodotti
  const handleCloseModalMod = () => {
    setOpenModalMod(false);
  };
  //-------------------------------------------------------------------
  //handle per aprire la modale di inserimento dettaglio---------------
  const handleOpenModal = () => {
    setOpenModalOrder(true);
  };
  //-------------------------------------------------------------------
  //handle per chiudere la modale di inserimento dettaglio-------------
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
        const res = await axios.get(
          `http://127.0.0.1:3000/dettagli/drink/${idOrdine}`,
        );
        setDetails(res.data);
      } else {
        const res = await axios.get(
          `http://127.0.0.1:3000/dettagli/food/${idOrdine}`,
        );
        setDetails(res.data);
      }
    } catch (error) {
      handleAlertError("Errore- Attendi e riprova");
      console.error("impossibile recuperare dettagli", error);
    }
  };
  //------------------------------------------------------------------
  //handle per cancellare dettaglio-----------------------------------
  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(`http://127.0.0.1:3000/dettagli/${id}`);
      console.log("cancellazione ok di", id);
      handleDetails();
      handleAlertConfirm("Ordinazione Cancellata");
      handleCloseAlert();
    } catch (error) {
      handleCloseAlert();
      handleAlertError("Errore- Attendi e riprova");
      console.error("Impossibile cancellare f", error);
    }
  };
  //------------------------------------------------------------------
  //handle per modificare i dati dettagli-----------------------------
  const handleModDetails = async (e) => {
    e.preventDefault();
    console.log(idToDelMod);
    try {
      const mod = await axios.put(
        `http://127.0.0.1:3000/dettagli/${idToDelMod}`,
        {
          note: modData.note || "",
          quantita: modData.quantita,
        },
      );
      console.log("Modifica avvenuta correttamente per id", idToDelMod);
      handleDetails();
      handleAlertConfirm("Ordinazione modificata");
      handleCloseModalMod();
    } catch (error) {
      handleCloseModalMod();
      handleAlertError("Errore- Attendi e riprova");
      console.error("Impossibile modificare f", error);
    }
  };
  //------------------------------------------------------------------

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
      {/* modale di cancellazione */}
      <ModalDelete
        open={openAlert}
        onClose={handleCloseAlert}
        name={prodSelected.map((p) => p.nome)}
        onDelete={() => handleDelete(idToDelMod)}
      ></ModalDelete>
      {/* fine modale cancellazione */}
      {/* inizio modale di modifica */}
      <Dialog open={openModalMod} onClose={handleCloseModalMod}>
        <DialogTitle>Modifica prodotto</DialogTitle>
        <DialogContent>
          <form id="subscription-form" onSubmit={handleModDetails}>
            <TextField
              id="outlined-read-only-input"
              defaultValue={modData.nome}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              value={modData.nome}
            />
            <TextField
              autoFocus
              margin="dense"
              id="descrizione"
              name="descrizione"
              label="Modifica Note"
              type="text"
              fullWidth
              variant="standard"
              value={modData.note}
              onChange={(e) => setModData({ ...modData, note: e.target.value })}
            />
            <label className="label-number">Quantità</label>
            <input
              type="number"
              className="input-number"
              min={1}
              max={20}
              value={modData.quantita}
              onChange={(e) =>
                setModData({ ...modData, quantita: e.target.value })
              }
            ></input>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseModalMod()}>Indietro</Button>
          <Button type="submit" form="subscription-form">
            Modifica
          </Button>
        </DialogActions>
      </Dialog>

      {/* fine modale di modifica */}
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
            <>
              <TableRow>
                <TableCell
                  onClick={() => handleRowClick(d.id_dettaglio)}
                  style={{
                    backgroundColor: selectedRows.includes(d.id_dettaglio)
                      ? "#10b981"
                      : "transparent",
                    textDecoration: selectedRows.includes(d.id_dettaglio)
                      ? "line-through"
                      : "none",
                  }}
                  component="th"
                  scope="row"
                >
                  {d.nome_prodotti}
                </TableCell>
                <TableCell align="left">{d.quantita}</TableCell>
                <TableCell align="right">
                  <ModeIcon
                    className="mod"
                    onClick={() =>
                      handleOpenModalMod(
                        d.id_dettaglio,
                        d.nome_prodotti,
                        d.note,
                        d.quantita,
                      )
                    }
                  ></ModeIcon>
                  <DeleteIcon
                    className="delete"
                    onClick={() =>
                      handleOpenAlert(d.id_dettaglio, d.nome_prodotti)
                    }
                  ></DeleteIcon>
                </TableCell>
              </TableRow>
              {d.note && (
                <TableRow className="note">
                  <TableCell colSpan={3}>↑ Note: {d.note}</TableCell>
                </TableRow>
              )}
            </>
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
        <Fab
          variant="extended"
          onClick={() => navigate("/pay", { state: { id: idOrdine } })}
        >
          <EuroIcon sx={{ mr: 1 }} />
          Paga
        </Fab>
      </div>
    </>
  );
}
export default Order;
