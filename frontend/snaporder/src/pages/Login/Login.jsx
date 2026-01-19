import "./Login.css";
import TextField from "@mui/material/TextField";
import Logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="container-form">
        <form className="login">
          <h1 className="title">SnapOrder</h1>
          <img src={Logo} alt="Logo" className="logo" />
          <TextField
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            className="text"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            margin="normal"
          />
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="text"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            className="submit"
            variant="contained"
            color="success"
            disabled={username === "" || password === ""}
            onClick={() => navigate("/home")}
          >
            Entra
          </Button>
          <label className="or">Oppure</label>
          <Button variant="outlined" onClick={handleClickOpen}>
            Registrati
          </Button>
        </form>
        <Dialog open={open} onClose={handleClose}>
          <form></form>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        {/* <Button variant="outlined" color="success">
            Registrati
          </Button> */}
      </div>
    </>
  );
}

export default Login;
