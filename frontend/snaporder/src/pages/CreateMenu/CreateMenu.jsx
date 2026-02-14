import "./CreateMenu.css";
import { useNavigate } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
import InputLabel from "@mui/material/InputLabel";
import AlertError from "../../components/alertError/AlertError";
import { useAlertError } from "../../hooks/useAlertError";
import AlertConfirm from "../../components/alertConfirm/AlertConfirm";
import { useAlertConfirm } from "../../hooks/useAlertConfirm";
import axios from "axios";
import { useState } from "react";

export default function CreateMenu() {
  const navigate = useNavigate();
  const { alertConfirm, setAlertConfirm, handleAlertConfirm } =
    useAlertConfirm();
  const { alertError, setAlertError, handleAlertError } = useAlertError();
  

  const handleProduct = async()=>{
    try{
      const res = await axios.get("http://127.0.0.1:3000/prodotti/cibi");
      setProductFood({
        id: res.data.id_prodotto,
        name: res.data.nome,
        prezzo: res.data.prezzo_unitario,
        disponibile: res.data.disponibile
      })
    }catch(error){
      console.error("impossibile caricare cibi", error);
    }
  }

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
      <svg className="close" onClick={() => navigate("/home")}>
        <CloseIcon className="title-menu"></CloseIcon>
      </svg>
      <p className="title-menu">Bar</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Panini</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Pizze</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Piatti</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Speciale</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <div className="container-add">
        <Fab
          onClick={() => setOpenModalOrder(!openModalOrder)}
          className="add-order"
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
