import "./Cash.css";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

function Cash() {
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
          <FormGroup className="container-checkbox">
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Label"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Required"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
            <FormControlLabel
              className="checkbox-cash"
              control={<Checkbox />}
              label="Disabled"
            />
          </FormGroup>
        </div>
      </div>
      <TextField
        className="text-parziale"
        id="outlined-read-only-input"
        label="Parziale"
        defaultValue="0 €"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      <TextField
        className="text-parziale"
        id="outlined-read-only-input"
        label="Parziale"
        defaultValue="0 €"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
      <TextField
        className="text-parziale"
        id="outlined-read-only-input"
        label="Parziale"
        defaultValue="0 €"
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

export default Cash;
