import React, { useMemo } from 'react';
import './VisitsList.css';

function VisitsList({ visits, onEdit, onDelete }) {
  const groupedVisits = useMemo(() => {
    const groups = {};
    visits.forEach((visit) => {
      if (!groups[visit.section]) {
        groups[visit.section] = [];
      }
      groups[visit.section].push(visit);
    });
    return groups;
  }, [visits]);

  return (
    <div className="visits-list">
      {Object.entries(groupedVisits).map(([section, sectionVisits]) => (
        <div key={section}>
          <h3 className="section-title">{section}</h3>
          {sectionVisits.map((visit) => (
            <div key={visit.id} className="visit-card">
              <div className="visit-icon">
                {visit.medio === 'vehiculo' ? '🚗' : '👤'}
              </div>
              <div className="visit-info">
                <div className="visit-name">{visit.nombre}</div>
                <div className="visit-time">
                  {visit.horaEntrada} - {visit.horaSalida} hrs
                </div>
                <div className="visit-date">{visit.fechaFormato}</div>
                {visit.patente && (
                  <div className="visit-plate">{visit.patente}</div>
                )}
              </div>
              <div className="visit-actions">
                <button
                  className="action-btn edit"
                  onClick={() => onEdit(visit)}
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => onDelete(visit.id)}
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default VisitsList;
