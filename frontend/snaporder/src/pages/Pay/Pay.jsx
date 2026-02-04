import "./Pay.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";

function Pay() {
  const navigate = useNavigate();
  const location = useLocation();
  const idOrdine = location.state?.id;
  console.log(idOrdine);
  const [details, setDetails] = useState([]);
  const [paidRows, setPaidRows] = useState(() => {
    const savedPaidRows = localStorage.getItem("paidRows");
    return savedPaidRows ? new Set(JSON.parse(savedPaidRows)) : new Set();
  });
  const [paid, setPaid] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  // Recupera paidRows da localStorage al caricamento del componente
  useEffect(() => {
    const savedPaidRows = localStorage.getItem("paidRows");
    if (savedPaidRows) {
      setPaidRows(new Set(JSON.parse(savedPaidRows)));
    }
  }, []);

  // Salva paidRows in localStorage ogni volta che cambia
  useEffect(() => {
    localStorage.setItem("paidRows", JSON.stringify(Array.from(paidRows)));
  }, [paidRows]);

  const totale = details
    .reduce((sum, d) => sum + parseFloat(d.subtotale || 0), 0)
    .toFixed(2);
  const parziale = (totale / details[0]?.numero_persone || 0).toFixed(2);
  const totaleSelezionato = selectedRows
    .reduce((sum, row) => sum + parseFloat(row.prezzo || 0), 0)
    .toFixed(2);
 
//useeffect per salvataggio righe selezionate
useEffect(() => {
    
  }, []);



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
  //espansione dei record per duplicare i dettagli ordine che hanno quantita > 1
  const expandedDetails = details.flatMap((d, index) =>
    Array.from({ length: d.quantita }, (_, i) => ({
      id: `${d.id_dettaglio || index}-${i}`,
      prodotto: d.nome_prodotti,
      quantita: 1,
      prezzo: d.prezzo_unitario,
    })),
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Invio scontrino:", {
      id_ordinazione: idOrdine,
      totale_pagato: paid,
    });
    try {
      const ins = await axios.post("http://127.0.0.1:3000/scontrini", {
        id_ordinazione: idOrdine,
        totale_pagato: paid,
      });
      handleDetails();
      console.log("Risposta:", ins.data);
    } catch (error) {
      console.error("impossibile creare scontrino", error);
    }
  };
  return (
    <>
      <div className="container-card-cash">
        <div className="container description-table">
          <span className="info-text">
            Nome:{" "}
            <span className="info-content">{details[0]?.nome_ordine}</span>
          </span>
          <svg
            className="close"
            onClick={() =>
              navigate("/home", { state: { selectArea: "Cassa" } })
            }
          >
            <CloseIcon></CloseIcon>
          </svg>
          <br></br>
          <span className="info-text">
            Persone:
            <span className="info-content">{details[0]?.numero_persone}</span>
          </span>
          <span className="info-text">
            Posizione:{" "}
            <span className="info-content">{details[0]?.posizione}</span>
          </span>
          <Paper sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={expandedDetails}
              columns={[
                { field: "prodotto", headerName: "Prodotto", width: 150 },
                { field: "quantita", headerName: "Quantità", width: 100 },
                { field: "prezzo", headerName: "Prezzo", width: 100 },
              ]}
              hideFooter={true}
              paginationModel={{ pageSize: 100, page: 0 }}
              pageSizeOptions={[100]}
              checkboxSelection
              isRowSelectable={(params) => !paidRows.has(params.row.id)}
              onRowSelectionModelChange={(selectionModel) => {
                const selectedIDs =
                  selectionModel.ids || new Set(selectionModel);
                const selectedRowData = expandedDetails.filter((row) =>
                  selectedIDs.has(row.id),
                );
                setSelectedRows(selectedRowData);
                console.log("Righe selezionate:", selectedRowData);
              }}
              getRowClassName={(params) =>
                paidRows.has(params.row.id) ? "row-paid" : ""
              }
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
        className="submit-cash"
        variant="contained"
        color="success"
        disabled={selectedRows.length === 0}
        onClick={() => {
          const newPaidRows = new Set(paidRows);
          selectedRows.forEach((row) => newPaidRows.add(row.id));
          setPaidRows(newPaidRows);
          setSelectedRows([]);
        }}
      >
        Paga selezionato: {totaleSelezionato} €
      </Button>
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          className="submit-cash"
          variant="contained"
          color="success"
        >
          Paga
        </Button>
        <TextField
          type="number"
          className="text-payment"
          id="outlined-basic"
          label="Inserisci Saldo"
          variant="outlined"
          margin="normal"
          value={paid}
          onChange={(e) => setPaid(parseFloat(e.target.value) || 0)}
        />
      </form>
    </>
  );
}

export default Pay;
