import "./Navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Badge from "@mui/material/Badge";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState, useEffect } from "react";
import axios from "axios";

function Navbar({ selectArea, setSelectArea }) {
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    const handleBadge = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:3000/ordinazioni/tot");
        setBadge(res.data.total || 0); 
      } catch (error) {
        console.error("Errore nel caricamento del badge:", error);
        setBadge(0); 
      }
    };
    handleBadge();
  }, [selectArea]);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelectArea(newValue);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        className="navbar-toggle-group"
        value={selectArea}
        exclusive
        aria-label="Platform"
        onChange={handleChange}
      >
        <ToggleButton
          className={
            selectArea === "Veloce" ? "selected" : "navbar-toggle-button"
          }
          value="Veloce"
        >
          <ElectricBoltIcon></ElectricBoltIcon>
        </ToggleButton>
        <Badge badgeContent={badge} color="success">
          <ToggleButton
            className={
              selectArea === "Tavoli" ? "selected" : "navbar-toggle-button"
            }
            value="Tavoli"
          >
            <RestaurantIcon></RestaurantIcon>
          </ToggleButton>
        </Badge>
        <ToggleButton
          className={
            selectArea === "Prodotti" ? "selected" : "navbar-toggle-button"
          }
          value="Prodotti"
        >
          <FastfoodIcon></FastfoodIcon>
        </ToggleButton>
        <ToggleButton
          className={
            selectArea === "Cassa" ? "selected" : "navbar-toggle-button"
          }
          value="Cassa"
        >
          <EuroSymbolIcon></EuroSymbolIcon>
        </ToggleButton>
        
      </ToggleButtonGroup>
      
    </>
  );
}

export default Navbar;
