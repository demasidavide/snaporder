import "./Navbar.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
        <ToggleButton
          className={
            selectArea === "Tavoli" ? "selected" : "navbar-toggle-button"
          }
          value="Tavoli"
        >
          Tavoli
        </ToggleButton>
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
