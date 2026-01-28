import './ModalDelete.css';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";



function ModalDelete({open,onClose,name,onDelete}){
    return(
        <>
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Elimina il prodotto ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Indietro</Button>
          <Button sx={{ color: "red" }} onClick={onDelete} autoFocus>
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
        </>
    )
}
export default ModalDelete;