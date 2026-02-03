import "./Login.css";
import Logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


function Login() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
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
          <DialogTitle>Registrazione nuovo utente</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="nome"
                label="Nome"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="cognome"
                label="Cognome"
                type="text"
                fullWidth
                variant="standard"
              />
              
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                
              />
              <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert severity="error">Email gia presente</Alert>
    </Stack>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
              />
              <Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert severity="error">Username gia presente</Alert>
    </Stack>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
              />
            </form>
            <DialogActions>
              <Button sx={{color:"grey"}} onClick={handleClose}>INDIETRO</Button>
              <Button sx={{color:"green"}} onClick={handleClose}>REGISTRATI</Button>
            </DialogActions>
            {loading ? (
              <>
              <Alert icon={<CheckIcon fontSize="inherit" />} variant="outlined" severity="success">
        This success Alert has a custom icon.
      </Alert>
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
             <LinearProgress color="success" />
            </Stack>
              </>
            ): ""}
          </DialogContent>
        </Dialog>
        {/* <Button variant="outlined" color="success">
            Registrati
          </Button> */}
      </div>
    </>
  );
}

export default Login;
