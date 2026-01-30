import { useNavigate } from "react-router";
import { Users, MapPin, ChevronRight, Trash2 } from "lucide-react";
import Ordine from "../../assets/ordine-3.svg";
import "./CardTable.css";

function CardTable({ name, num, located, id, onClick, onDelete }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="tavolo-card" onClick={onClick}>
        <div className="tavolo-card-content">
          <div className="tavolo-info">
            {/* Nome tavolo */}
            <h3 className="tavolo-nome">{name}</h3>

            {/* Info tavolo */}
            <div className="tavolo-dettagli">
              <div className="dettaglio-item">
                <MapPin className="icon icon-posizione" />
                <span className="dettaglio-testo">{located}</span>
              </div>

              <div className="dettaglio-item">
                <Users className="icon icon-persone" />
                <span className="dettaglio-testo dettaglio-bold">
                  {num} {num === 1 ? "persona" : "persone"}
                </span>
              </div>

              <Trash2
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(id);
                }}
                className="icon-trash"
              />
            </div>
          </div>
          <img src={Ordine} alt="Ordine" className="img-ordine" />
          {/* Azioni */}
          <div className="tavolo-azioni">
            <ChevronRight
              onClick={(e) => {
                e.stopPropagation();
                navigate("/order", { state: { id: id } });
              }}
              className="icon-chevron"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default CardTable;
