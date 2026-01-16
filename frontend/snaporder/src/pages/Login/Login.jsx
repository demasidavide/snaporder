import "./Login.css";
import TextField from "@mui/material/TextField";
import Logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
          >
            Entra
          </Button>
          <label className="or">Oppure</label>
          <Button variant="outlined" color="success">
            Registrati
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;
