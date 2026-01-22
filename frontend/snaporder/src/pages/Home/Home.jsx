import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import CardTable from "../../components/cardTable/CardTable";
import ProductList from "../../components/productList/ProductList";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import ModalTable from "../../components/modalTable/ModalTable";
import { useState } from "react";

function Home() {
  const [selectArea, setSelectArea] = useState("Tavoli"); //stato passato da navbar
  const [openModalAddTable, setOpenModalAddTable] = useState(false);

  //handle per aprire la modale di inserimento tavoli
  const handleOpenModal = () => {
    setOpenModalAddTable(true);
  };
  //---------------------------------------------------
  //handle per chiudere la modale di inserimento tavoli
  const handleCloseModal = () => {
    setOpenModalAddTable(false);
  };
  //----------------------------------------------------
  return (
    <>
      <Navbar selectArea={selectArea} setSelectArea={setSelectArea}></Navbar>
      <div className="container-main">
        {selectArea === "Tavoli" && (
          <>
            <div className="container-add-table">
              <Fab
                onClick={handleOpenModal}
                className="add-table"
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
              <ModalTable></ModalTable>
              {/* <Dialog open={openModalAddTable} onClose={handleCloseModal}>
                <DialogTitle>Aggiungi tavolo</DialogTitle>
                <DialogContent>
                  <form id="subscription-form">
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
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        justifyContent: "center",
                      }}
                    >
                      <br></br>

                    </Box>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal}>Indietro</Button>
                  <Button type="submit" form="subscription-form">
                    Aggiungi
                  </Button>
                </DialogActions>
              </Dialog> */}
            </div>
            <CardTable></CardTable>
            <CardTable></CardTable>
          </>
        )}
        {selectArea === "Prodotti" && (
          <>
            <ProductList></ProductList>
          </>
        )}
        {selectArea === "Cassa" && (
          <>
            <div className="container-add"></div>
            <CardTable></CardTable>
            <CardTable></CardTable>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
