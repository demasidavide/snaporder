import { useNavigate } from "react-router";
import "./CardTable.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CardTable({name,num,located,id}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-card-table">
        <div className="container description-table">
          <span className="info-text">Nome: <span className="info-content">{name}</span></span><br></br>
          <span className="info-text">Persone:<span className="info-content">{num}</span>
          </span>
          <span className="info-text">
            Posizione: <span className="info-content">{located}</span>
          </span>
          <h5 className="info-text">Totale: <span className="info-content">75$</span> </h5>
        </div>
        <button onClick={()=>navigate('/order', {state:{ id : id }})} className="open-table">
          <ArrowForwardIosIcon fontSize="large"></ArrowForwardIosIcon>
        </button>
      </div>
    </>
  );
}
export default CardTable;
