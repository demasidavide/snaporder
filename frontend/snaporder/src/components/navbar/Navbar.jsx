import "./Navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Badge from "@mui/material/Badge";
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar({ selectArea, setSelectArea }) {
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    const handleBadge = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/tavoli/tot");
        setBadge(res.data.total || 0); 
      } catch (error) {
        console.error("Errore nel caricamento del badge:", error);
        setBadge(0); 
      }
    };
    handleBadge();
  }, [selectArea]);

  return (
    <>
      <ToggleButtonGroup
        className="navbar-toggle-group"
        value={selectArea}
        exclusive
        aria-label="Platform"
        onChange={(e) => {
          setSelectArea(e.target.value);
        }}
      >
        <ToggleButton
          className={
            selectArea === "Veloce" ? "selected" : "navbar-toggle-button"
          }
          value="Veloce"
        >
          Veloce
        </ToggleButton>
        <Badge badgeContent={badge} color="success">
          <ToggleButton
            className={
              selectArea === "Tavoli" ? "selected" : "navbar-toggle-button"
            }
            value="Tavoli"
          >
            Tavoli
          </ToggleButton>
        </Badge>
        <ToggleButton
          className={
            selectArea === "Prodotti" ? "selected" : "navbar-toggle-button"
          }
          value="Prodotti"
        >
          Prodotti
        </ToggleButton>
        <ToggleButton
          className={
            selectArea === "Cassa" ? "selected" : "navbar-toggle-button"
          }
          value="Cassa"
        >
          Cassa
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default Navbar;
