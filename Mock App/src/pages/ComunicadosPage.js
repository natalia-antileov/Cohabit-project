import React, { useState, useMemo } from 'react';
import './ComunicadosPage.css';

const comunicadosData = [
  {
    id: '1',
    title: 'Arriendo de departamento',
    category: 'general',
    categoryLabel: 'Oferta',
    text: 'Se arrienda departamento 5B Torre Norte. Interesados contactar a Maribel Olivares +56912345678',
    date: 'Ayer',
    section: 'Fijados',
  },
  {
    id: '2',
    title: 'Ascensor Torre Norte fuera de servicio',
    category: 'urgente',
    categoryLabel: 'Urgente • Mantenición',
    text: 'Estimados residentes, Les informamos que debido a fallos técnico del ascensor, este se encontrará fuera de servicio hasta mañana.',
    date: 'Mar, 4 - Mié, 5 Nov',
    section: 'Hoy',
  },
  {
    id: '3',
    title: 'Mantenición programada de piscina',
    category: 'mantencion',
    categoryLabel: 'Mantenición',
    text: 'Estimados residentes, Les informamos que como cada semana, la piscina estará cerrada el día de hoy entre 07:00 y las 09:00 hrs',
    date: '07:00 - 09:00 hrs | Mar, 4 Nov',
    section: 'Hoy',
  },
  {
    id: '4',
    title: 'Completada en Quincho',
    category: 'general',
    categoryLabel: 'Oferta',
    text: 'Se realizará completada el viernes en el quincho del Jardín Central. A $25000 los completos.',
    date: 'Vie, 7 Nov | 12:00 - 18:00 hrs',
    section: 'Hoy',
  },
  {
    id: '5',
    title: 'Ascensor Torre Sur fuera de servicio',
    category: 'urgente',
    categoryLabel: 'Urgente • Mantenición',
    text: 'Estimados residentes, Les informamos que debido a fallos técnico del ascensor, este se encontrará fuera de servicio hasta mañana.',
    date: 'Dom, 2 - Lun, 3 Nov',
    section: 'Ayer',
  },
  {
    id: '6',
    title: 'Evento de Recaudación',
    category: 'general',
    categoryLabel: 'Evento',
    text: 'Estimados residentes, Les informamos que el Lunes 17 de noviembre se realizará el evento de recaudación anual. Quedan todos cordialmente invitados',
    date: 'Lun, 17 Nov | 16:00 - 20:00 hrs',
    section: 'Domingo, 2 de Noviembre',
  },
];

function ComunicadosPage() {
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const filteredComunicados = useMemo(() => {
    if (selectedFilter === 'todos') {
      return comunicadosData;
    }
    return comunicadosData.filter((c) => c.category === selectedFilter);
  }, [selectedFilter]);

  const groupedComunicados = useMemo(() => {
    const groups = {};
    filteredComunicados.forEach((comunicado) => {
      if (!groups[comunicado.section]) {
        groups[comunicado.section] = [];
      }
      groups[comunicado.section].push(comunicado);
    });
    return groups;
  }, [filteredComunicados]);

  const getCardClassName = (category) => {
    switch (category) {
      case 'urgente':
        return 'comunicado-card urgente';
      case 'mantencion':
        return 'comunicado-card mantencion';
      case 'general':
        return 'comunicado-card general';
      default:
        return 'comunicado-card general';
    }
  };

  return (
    <div className="comunicados-page">
      {/* Filter Buttons */}
      <div className="filter-container">
        {['todos', 'urgente', 'mantencion', 'general'].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${selectedFilter === filter ? `btn-${filter}` : ''}`}
            onClick={() => {
              console.log('Click on:', filter);
              setSelectedFilter(filter);
            }}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Comunicados List */}
      <div className="comunicados-list">
        {Object.entries(groupedComunicados).map(([section, items]) => (
          <div key={section}>
            <h3 className="section-title">{section}</h3>
            {items.map((comunicado) => (
              <div key={comunicado.id} className={getCardClassName(comunicado.category)}>
                <div className="card-header">
                  <h4 className="card-title">{comunicado.title}</h4>
                  <span className="time-badge">{comunicado.date}</span>
                </div>
                <p className="comunicado-category">{comunicado.categoryLabel}</p>
                <p className="comunicado-text">{comunicado.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComunicadosPage;
