import React from 'react';
import { Users, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import Cassa from "../../assets/cassa-3.svg";

import './CardCash.css';

const CardCash = ({ name,num,located,id, onClick }) => {
  const navigate = useNavigate();
  return (
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
                {num} {num === 1 ? 'persona' : 'persone'}
              </span>
            </div>
          </div>
        </div>
                  <img src={Cassa} alt="Ordine" className="img-cassa" />
        
        {/* Freccia */}
        <div className="tavolo-freccia">
          <ChevronRight
          onClick={()=>navigate('/pay', {state:{ id : id }})}
          className="icon-chevron" />
        </div>
      </div>
    </div>
  );
};
export default CardCash;