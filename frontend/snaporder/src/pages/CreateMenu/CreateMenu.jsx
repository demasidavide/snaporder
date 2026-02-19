import "./CreateMenu.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import AlertError from "../../components/alertError/AlertError";
import AlertConfirm from "../../components/alertConfirm/AlertConfirm";
import { useAlertError } from "../../hooks/useAlertError";
import { useAlertConfirm } from "../../hooks/useAlertConfirm";
import { useProductContext } from "../../context/ProductContext";
import { TableAccordion } from "../../components/tableAccordion/TableAccordion";
import { FormAccordion } from "../../components/formAccordion/FormAccordion";
import axios from "axios";

export default function CreateMenu() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productSelected: "",
    note: "",
  });
  const [ idToDelete, setIdToDelete ] = useState();
  const { alertConfirm, setAlertConfirm, handleAlertConfirm } =
    useAlertConfirm();
  const { alertError, setAlertError, handleAlertError } = useAlertError();
  const { allProducts, food, drink, menuProducts, setMenuProducts } =
    useProductContext();
  //filtro i prodotti per categoria per generare le tabelle
  const barMenu = menuProducts.filter(p=>p.categoria === 'bar');

  useEffect(()=>{
    loadMenu();
  },[]);
  
  const loadMenu = async()=>{
    try{
      const res = await axios.get("http://127.0.0.1:3000/menu");
      console.log(res.data)
      setMenuProducts(res.data)
    }catch(error){
      console.error("Impossibile caricare menu",error)
    }
  } 
    
  const handleDelete = async(id_prodotto)=>{
    console.log(id_prodotto);
try {
    await axios.delete(`http://127.0.0.1:3000/menu/${id_prodotto}`);
    // Ricarica il menu
    loadMenu();
    handleAlertConfirm("Prodotto eliminato dal menù");
  } catch(error) {
    handleAlertError("Impossibile eliminare il prodotto");
  }
}
  
    
    const handleSubmit = async(e,categoria)=>{
      e.preventDefault();
      try{
        const res = await axios.post("http://127.0.0.1:3000/menu",{
          id_prodotto: formData.productSelected,
          note: formData.note,
          categoria:categoria
        })
        // Ricarica i prodotti del menu
    const menuRes = await axios.get("http://127.0.0.1:3000/menu");
    setMenuProducts(menuRes.data);

        handleAlertConfirm("Prodotto inserito nel menù")
        setFormData({productSelected:"",note:""})
      }catch(error){
        console.error("impossibile inserire nel menu",error)
      }
    } 

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
          <FormAccordion
            elements={drink}
            productSelected={formData.productSelected}
            setProductSelected={(value) =>
              setFormData((prev) => ({ ...prev, productSelected: value }))
            }
            note={formData.note}
            setNote={(value) =>
              setFormData((prev) => ({ ...prev, note: value }))
            }
            categoria = "bar"
            onSubmit = {(e)=>handleSubmit(e,"bar")}
          ></FormAccordion>
          <TableAccordion 
          element={barMenu}
          onDelete={handleDelete}>
          </TableAccordion>
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
