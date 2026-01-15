import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
