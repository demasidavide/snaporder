import "./CreateMenu.css";
import { useNavigate } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AlertError from "../../components/alertError/AlertError";
import { useAlertError } from "../../hooks/useAlertError";
import AlertConfirm from "../../components/alertConfirm/AlertConfirm";
import { useAlertConfirm } from "../../hooks/useAlertConfirm";
import { useProductContext } from "../../context/ProductContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TableAccordion } from "../../components/tableAccordion/TableAccordion";

export default function CreateMenu() {
  const navigate = useNavigate();
  const { alertConfirm, setAlertConfirm, handleAlertConfirm } =
    useAlertConfirm();
  const { alertError, setAlertError, handleAlertError } = useAlertError();
  const { allProducts, food, drink, menuProducts, setMenuProducts } =
    useProductContext();

  return (
    <>
      <AlertError
        open={alertError.open}
        onClose={() => setAlertError({ open: false, message: "" })}
        message={alertError.message}
      ></AlertError>
      <AlertConfirm
        open={alertConfirm.open}
        onClose={() => setAlertConfirm({ open: false, message: "" })}
        message={alertConfirm.message}
      ></AlertConfirm>
      <svg className="close" onClick={() => navigate("/home")}>
        <CloseIcon className="title-menu"></CloseIcon>
      </svg>
      <p className="title-menu">Bar</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Seleziona prodotti</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form>
            <InputLabel id="demo-select-small-label">Prodotti</InputLabel>
            <Select
            className="select-accordion"
              labelId="demo-select-small-label"
              id="demo-select-small"
              value=""
            >
              {drink.map((element) => (
                <MenuItem value={element.id_prodotto}>{element.nome}</MenuItem>
              ))}
            </Select>
            <Button type="submit" className="submit-accordion">Inserisci</Button>
          </form>
          <TableAccordion element={drink}></TableAccordion>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Panini</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Pizze</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Piatti</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <p className="title-menu">Speciale</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
