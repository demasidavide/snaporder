import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import Order from "./pages/Order/Order.jsx";
import Pay from "./pages/Pay/Pay.jsx"
import Quick from "./pages/Quick/Quick.jsx";
import CreateMenu from "./pages/CreateMenu/CreateMenu.jsx";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/quick" element={<Quick />} />
        <Route path="/create" element={<CreateMenu />} />
      </Routes>
   
  );
}

export default App;
