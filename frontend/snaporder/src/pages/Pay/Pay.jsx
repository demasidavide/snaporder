import "./Pay.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const idOrdine = location.state?.id;
  console.log(idOrdine);
  const [details, setDetails] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const totale = details
    .reduce((sum, d) => sum + parseFloat(d.subtotale || 0), 0)
    .toFixed(2);
  const parziale = (totale / details[0]?.numero_persone).toFixed(2);
  const totaleSelezionato = selectedRows
    .reduce((sum, row) => sum + parseFloat(row.prezzo || 0), 0)
    .toFixed(2);
  console.log(totale, totaleSelezionato);
  useEffect(() => {
    handleDetails();
  }, []);

  const handleDetails = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:3000/dettagli/pay/${idOrdine}`,
      );
      setDetails(res.data);
    } catch (error) {
      console.error("impossibile caricare la tabella", error);
    }
  };

  return (
    <>
      <div className="container-card-cash">
        <div className="container description-table">
          <span className="info-text">
            Nome: <span className="info-content">Marco</span>
          </span>
          <br></br>
          <span className="info-text">
            Persone:<span className="info-content">8</span>
          </span>
          <span className="info-text">
            Posizione: <span className="info-content">Sopra</span>
          </span>
          <Paper sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={details.map((d, index) => ({
                id: d.id_dettaglio || index,
                prodotto: d.nome_prodotti,
                quantita: d.quantita,
                prezzo: d.prezzo_unitario,
                prezzotot: d.subtotale,
              }))}
              columns={[
                { field: "prodotto", headerName: "Prodotto", width: 150 },
                { field: "quantita", headerName: "Quantità", width: 100 },
                { field: "prezzo", headerName: "Prezzo", width: 100 },
                { field: "prezzotot", headerName: "Tot", width: 100 },
              ]}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={(selectionModel) => {
                const selectedIDs = selectionModel.ids || selectionModel;
                const selectedRowData = details
                  .map((d, index) => ({
                    id: d.id_dettaglio || index,
                    prodotto: d.nome_prodotti,
                    quantita: d.quantita,
                    prezzo: d.prezzo_unitario,
                    prezzotot: d.subtotale,
                  }))
                  .filter((row) => selectedIDs.has(row.id));
                setSelectedRows(selectedRowData);
                console.log("Righe selezionate:", selectedRowData);
              }}
              sx={{ border: 0 }}
            />
          </Paper>
        </div>
      </div>
      <TextField
        className="text-parziale"
        id="outlined-read-only-input"
        label="Totale"
        value={`${totale} €`}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      <TextField
        className="text-parziale"
        id="outlined-read-only-input"
        label="A testa"
        value={`${parziale} €`}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      <TextField
        className="text-parziale"
        id="outlined-read-only-input"
        label="Selezionato"
        value={`${totaleSelezionato} €`}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />

      <Button
        type="submit"
        className="submit-cash"
        variant="contained"
        color="success"
      >
        Paga
      </Button>
      <TextField
        type="text"
        className="text-payment"
        id="outlined-basic"
        label="Saldo diverso"
        variant="outlined"
        margin="normal"
      />
    </>
  );
}

export default Pay;
