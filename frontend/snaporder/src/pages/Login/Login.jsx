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
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

function Login() {
  const [open, setOpen] = useState(false);
  const [openText, setOpenText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameApproved, setUsernameApproved] = useState("");
  const [passwordApproved, setPasswordApproved] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    value: false,
    message: "",
  });
 

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenText = () => {
    setOpenText(true);
  };

  const handleCloseText = () => {
    setOpenText(false);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setErrorMessage({value:false,message:""})
    console.log(username, email, password, nome, cognome);
    setLoading(true);
    await delay(3000);
    setLoading(false);
    try {
      const ins = await axios.post("http://127.0.0.1:3000/auth/register", {
        username: username,
        email: email,
        password_hash: password,
        nome: nome,
        cognome: cognome,
      });
      console.log(ins.status);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage({value:true, message:error.response.data.errors});
        if (error.response) {
          console.error(
            "Errore risposta server:",
            error.response.status,
            error.response.data,
          );
        }
      }
    }
  };

  return (
    <>
      <div className="container-form">
        <form className="login">
          <h1 className="title">SnapOrder</h1>
          <img src={Logo} alt="Logo" className="logo" />
          <TextField
            value={usernameApproved}
            onChange={(e) => {
              setUsernameApproved(e.target.value);
            }}
            type="text"
            className="text"
            id="outlined-basic"
            label="Username"
            variant="outlined"
            margin="normal"
          />
          <TextField
            value={passwordApproved}
            onChange={(e) => {
              setPasswordApproved(e.target.value);
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
        {/* inizio modale di registrazione */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Registrazione nuovo utente</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmitRegister}>
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <DialogActions>
                <Button sx={{ color: "grey" }} onClick={handleClose}>
                  INDIETRO
                </Button>
                <Button sx={{ color: "green" }} type="submit">
                  REGISTRATI
                </Button>
              </DialogActions>
            </form>
            {errorMessage.value && 
              errorMessage.message.map((msg, index) => (
              <Alert key={index} variant="filled" severity="error">
                {msg}
              </Alert>
            ))}

            {loading ? (
              <>
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="inherit" />
                </Stack>
              </>
            ) : (
              ""
            )}
          </DialogContent>
        </Dialog>
        {/* inizio dialog post inserimento con spiegazione */}
        <Dialog
          open={openText}
          onClose={handleCloseText}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseText}>Disagree</Button>
            <Button onClick={handleCloseText} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Login;
