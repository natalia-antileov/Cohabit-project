import React, { useMemo, useState } from 'react';
import './VisitsList.css';

function VisitsList({ visits, onEdit, onDelete }) {
  const [expandedVisitId, setExpandedVisitId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(null);
  const [approvedVisits, setApprovedVisits] = useState(new Set());

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

  const toggleExpanded = (visitId) => {
    setExpandedVisitId(expandedVisitId === visitId ? null : visitId);
    setShowDatePicker(null);
    setShowTimePicker(null);
  };

  const handleApproveClick = (visitId) => {
    setApprovedVisits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(visitId)) {
        newSet.delete(visitId);
      } else {
        newSet.add(visitId);
      }
      return newSet;
    });
  };

  return (
    <div className="visits-list">
      {Object.entries(groupedVisits).map(([section, sectionVisits]) => (
        <div key={section}>
          <h3 className="section-title">{section}</h3>
          {sectionVisits.map((visit) => (
            <div key={visit.id} className={`visit-card ${expandedVisitId === visit.id ? 'expanded' : ''}`}>
              <div className="visit-header">
                <div className="visit-icon">
                  {visit.medio === 'vehiculo' ? '🚗' : '👤'}
                </div>
                <div className="visit-info">
                  <div className="visit-name">{visit.nombre}</div>
                  <div className="visit-meta">
                    <span
                      className="visit-date-time clickable"
                      onClick={() => {
                        setShowDatePicker(showDatePicker === visit.id ? null : visit.id);
                        setShowTimePicker(null);
                      }}
                      title="Click para cambiar fecha"
                    >
                      📅 {visit.fechaFormato}
                    </span>
                    <span
                      className="visit-time clickable"
                      onClick={() => {
                        setShowTimePicker(showTimePicker === visit.id ? null : visit.id);
                        setShowDatePicker(null);
                      }}
                      title="Click para cambiar hora"
                    >
                      🕐 {visit.horaEntrada} - {visit.horaSalida} hrs
                    </span>
                  </div>

                  {showDatePicker === visit.id && (
                    <div className="date-picker-dropdown">
                      <input type="date" defaultValue={visit.fecha} />
                    </div>
                  )}

                  {showTimePicker === visit.id && (
                    <div className="time-picker-dropdown">
                      <div className="time-picker-group">
                        <label>Entrada:</label>
                        <input type="time" defaultValue={visit.horaEntrada} />
                      </div>
                      <div className="time-picker-group">
                        <label>Salida:</label>
                        <input type="time" defaultValue={visit.horaSalida} />
                      </div>
                    </div>
                  )}

                  {expandedVisitId === visit.id && (
                    <div className="visit-details">
                      <div className="detail-row">
                        <span className="detail-label">RUT:</span>
                        <span className="detail-value">{visit.rut || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Tipo:</span>
                        <span className="detail-value">{visit.tipo}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Medio de llegada:</span>
                        <span className="detail-value">{visit.medio === 'vehiculo' ? 'Vehículo' : 'A pie'}</span>
                      </div>
                      {visit.patente && (
                        <div className="detail-row">
                          <span className="detail-label">Patente:</span>
                          <span className="detail-value">{visit.patente}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="visit-actions">
                <button
                  className={`action-btn approve ${approvedVisits.has(visit.id) ? 'active' : ''}`}
                  onClick={() => handleApproveClick(visit.id)}
                  title="Marcar como accionable"
                >
                  ✓
                </button>
                <button
                  className="action-btn details"
                  onClick={() => toggleExpanded(visit.id)}
                  title="Ver detalles"
                >
                  ⋮
                </button>
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
