import "./Login.css";



function Login() {
  return (
    <>
    <div className="container-form">
      <form className="login">
        <input type="text" placeholder="Inserisci username"></input><br></br>
        <input type="password" placeholder="Inserisci password"></input><br></br>
      </form>
    </div>
    </>
  );
}

export default Login;
