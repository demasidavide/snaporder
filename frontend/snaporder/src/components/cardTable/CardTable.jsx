import { useNavigate } from "react-router";
import { Users, MapPin, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDetailsDelay } from "../../context/delayContext";
import Ordine from "../../assets/ordine-3.svg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "axios";
import "./CardTable.css";

function CardTable({ name, num, located, id, onClick, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { detailsDelay, selectedRows } = useDetailsDelay();
  const delayedOrder = detailsDelay.filter(detailsDelay => detailsDelay.id_ordinazione === id );
  const selectedHasOrder = delayedOrder.some(detail => !selectedRows.includes(detail.id_dettaglio))
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const del = await axios.delete(`http://127.0.0.1:3000/ordinazioni/${id}`);
      console.log("cancellazione riuscita");
    } catch (error) {
      console.error("Impossibile cancellare", error);
    }
  };

  return (
    <>
      {/* alert per cancellazione */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="alert-delete"
      >
        <DialogTitle sx={{ color: "red" }} id="alert-dialog-title">
          {"Attenzione"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cancellare l'ordine e tutti gli elementi <br></br>all'interno?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "grey" }} onClick={handleClose}>
            indietro
          </Button>
          <Button
            sx={{ color: "red" }}
            onClick={() => handleDelete(id)}
            autoFocus
          >
            Cancella
          </Button>
        </DialogActions>
      </Dialog>
      <div className="tavolo-card" onClick={onClick}>
        <div className="tavolo-card-content">
          <div className="tavolo-info">
            {/* Nome tavolo */}
            <h3 className="tavolo-nome">{name}</h3>

            {/* Info tavolo */}
            <div className="tavolo-dettagli">
              <div className="dettaglio-item">
                <MapPin className="icon icon-posizione" />
                <span className="dettaglio-testo">{located}</span>
              </div>

              <div className="dettaglio-item">
                <Users className="icon icon-persone" />
                <span className="dettaglio-testo dettaglio-bold">
                  {num} {num === 1 ? "persona" : "persone"}
                </span>
              </div>

              <Trash2 onClick={handleClickOpen} className="icon-trash" />
            </div>
          </div>
          <img src={Ordine} alt="Ordine" className="img-ordine" />
          {/* Azioni */}
          <div className="tavolo-azioni">
            <ChevronRight
              onClick={(e) => {
                e.stopPropagation();
                navigate("/order", { state: { id: id } });
              }}
              className="icon-chevron"
            />
          </div>
        </div>
        {selectedHasOrder &&
        <div className="alert-delay">
          <NotificationsActiveIcon
          className="alert-icon-table"
          ></NotificationsActiveIcon>&nbsp; Attenzione
          Ci sono ordini in ritardo!
        </div>
        }
      </div>
    </>
  );
}
export default CardTable;
