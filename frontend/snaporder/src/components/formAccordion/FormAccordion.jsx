import "./FormAccordion.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

export function FormAccordion({
  elements,
  productSelected,
  setProductSelected,
  note,
  setNote,
  categoria,
  onSubmit,
}) {
  return (
    <>
      <form className="form-accordion" onSubmit={onSubmit}>
        <InputLabel id="demo-select-small-label">Seleziona</InputLabel>
        <Select
          required
          className="select-accordion"
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={productSelected}
          onChange={(e) => setProductSelected(e.target.value)}
        >
          {elements.map((element) => (
            <MenuItem key={element.id_prodotto} value={element.id_prodotto}>
              {element.nome}
            </MenuItem>
          ))}
        </Select>
        <TextField
          required
          placeholder="Inserisci descrizione"
          className="text-accordion"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></TextField>
        <Button
          type="submit"
          sx={{
            padding: "10px",
            border: "1px solid var(--confirm)",
            color: "var(--header)",
            fontWeight: "bold",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          Inserisci
        </Button>
        <Divider
          sx={{
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
            borderColor: "var(--secondary)",
            borderWidth: "1px",
          }}
        />
      </form>
    </>
  );
}
