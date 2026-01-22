import "./Navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';


function Navbar({ selectArea, setSelectArea }) {
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
        <Badge badgeContent={4} color="success">
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
