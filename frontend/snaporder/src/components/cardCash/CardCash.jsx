import React from 'react';
import { Users, MapPin, ChevronRight } from 'lucide-react';
import './CardCash.css';

const CardCash = ({ nome, posizione, numPersone, onClick }) => {
  return (
    <div className="tavolo-card" onClick={onClick}>
      <div className="tavolo-card-content">
        <div className="tavolo-info">
          {/* Nome tavolo */}
          <h3 className="tavolo-nome">{nome}</h3>
          
          {/* Info tavolo */}
          <div className="tavolo-dettagli">
            <div className="dettaglio-item">
              <MapPin className="icon icon-posizione" />
              <span className="dettaglio-testo">{posizione}</span>
            </div>
            
            <div className="dettaglio-item">
              <Users className="icon icon-persone" />
              <span className="dettaglio-testo dettaglio-bold">
                {numPersone} {numPersone === 1 ? 'persona' : 'persone'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Freccia */}
        <div className="tavolo-freccia">
          <ChevronRight className="icon-chevron" />
        </div>
      </div>
    </div>
  );
};
export default CardCash;