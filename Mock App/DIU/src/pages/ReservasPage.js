import React, { useState } from 'react';
import './ReservasPage.css';

function ReservasPage() {
  const [reservations, setReservations] = useState([
    {
      id: '1',
      space: 'Sala de eventos - 50 personas',
      date: '2024-11-15',
      time: '09:00-11:00',
      resident: 'Carlos Pérez',
      status: 'Confirmada',
    },
    {
      id: '2',
      space: 'Cancha de tenis',
      date: '2024-11-16',
      time: '14:00-16:00',
      resident: 'María González',
      status: 'Confirmada',
    },
  ]);

  const [formData, setFormData] = useState({
    space: 'Sala de eventos - 50 personas',
    date: '',
    time: '09:00-11:00',
  });

  const [showTerms, setShowTerms] = useState(false);

  const spaces = [
    'Sala de eventos - 50 personas',
    'Cancha de tenis',
    'Piscina',
    'Parque infantil',
  ];

  const timeSlots = [
    '09:00-11:00',
    '11:00-13:00',
    '14:00-16:00',
    '16:00-18:00',
    '19:00-21:00',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date) {
      alert('Por favor selecciona una fecha');
      return;
    }

    const newReservation = {
      id: Date.now().toString(),
      ...formData,
      resident: 'Residente Actual',
      status: 'Confirmada',
    };

    setReservations([...reservations, newReservation]);
    setFormData({ space: 'Sala de eventos - 50 personas', date: '', time: '09:00-11:00' });
    alert('¡Reserva realizada exitosamente!');
  };

  const handleCancel = (id) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      setReservations(reservations.filter((r) => r.id !== id));
      alert('Reserva cancelada');
    }
  };

  return (
    <div className="reservas-page">
      <div className="reservas-content">
        {/* Booking Form */}
        <div className="reservas-form-section">
          <h2 className="section-header">Seleccionar Horarios</h2>

          <div className="alert-info">
            <span className="alert-icon">ℹ️</span>
            <p>
              Información Importante: Los espacios son gratuitos, pero se aplican multas por no cumplir
              con el horario reservado o dejar el espacio en mal estado.
            </p>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowTerms(true); }} className="see-more">
              Ver términos y condiciones
            </a>
          </div>

          <form onSubmit={handleSubmit} className="reservas-form">
            <div className="form-group">
              <label>Espacio</label>
              <select name="space" value={formData.space} onChange={handleChange}>
                {spaces.map((space) => (
                  <option key={space} value={space}>
                    {space}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Horario disponible</label>
              <div className="time-slots">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                    onClick={() => setFormData({ ...formData, time: slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <p className="time-summary">
                ✓ Resumen de Reserva: {formData.space} - {formData.time}
              </p>
            </div>

            <button type="submit" className="btn-reserve">
              🔔 Registrar Visita
            </button>
          </form>
        </div>

        {/* Reservations List */}
        <div className="reservas-list-section">
          <h2 className="section-header">Mis Reservas</h2>

          <div className="reservations-grid">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="res-header">
                  <h3>{reservation.space}</h3>
                  <span className="res-status">{reservation.status}</span>
                </div>
                <div className="res-details">
                  <p>
                    <strong>Fecha:</strong> {new Date(reservation.date).toLocaleDateString('es-ES')}
                  </p>
                  <p>
                    <strong>Hora:</strong> {reservation.time}
                  </p>
                  <p>
                    <strong>Residente:</strong> {reservation.resident}
                  </p>
                </div>
                <button
                  className="btn-cancel"
                  onClick={() => handleCancel(reservation.id)}
                >
                  ❌ Cancelar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Términos y Condiciones</h2>
              <button
                className="modal-close"
                onClick={() => setShowTerms(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="terms-section">
                <h3>1. Reserva de Espacios Comunes</h3>
                <p>
                  Los residentes pueden reservar espacios comunes del condominio de acuerdo con la disponibilidad y
                  siguiendo el calendario de reservas establecido. Las reservas deben realizarse con al menos 48 horas
                  de anticipación.
                </p>
              </div>

              <div className="terms-section">
                <h3>2. Horarios de Uso</h3>
                <p>
                  Los espacios están disponibles en los horarios establecidos: de 09:00 a 21:00 horas. Los horarios
                  especiales pueden ser solicitados a administración, sujeto a aprobación.
                </p>
              </div>

              <div className="terms-section">
                <h3>3. Responsabilidad y Daños</h3>
                <p>
                  El residente que realiza la reserva es responsable por el cuidado y mantenimiento del espacio durante
                  la duración de la reserva. Cualquier daño o deterioro será cobrado al residente responsable de la reserva.
                </p>
              </div>

              <div className="terms-section">
                <h3>4. Cancelación de Reservas</h3>
                <p>
                  Las reservas pueden ser canceladas con al menos 24 horas de anticipación sin penalización.
                  Cancelaciones realizadas después de este plazo podrán estar sujetas a multa.
                </p>
              </div>

              <div className="terms-section">
                <h3>5. Incumplimiento de Horarios</h3>
                <p>
                  Se aplicará una multa de acuerdo con el tarifario establecido por la administración del condominio
                  por cada hora adicional de uso o por no respetar el horario reservado.
                </p>
              </div>

              <div className="terms-section">
                <h3>6. Limpieza y Orden</h3>
                <p>
                  El residente debe dejar el espacio limpio y en orden al final de la reserva. Incumplimiento de esta
                  norma resultará en una multa por limpieza adicional.
                </p>
              </div>

              <div className="terms-section">
                <h3>7. Ruido y Perturbación</h3>
                <p>
                  Se deben respetar los límites de ruido establecidos por el condominio. El ruido excesivo que
                  perturbe a otros residentes puede resultar en sanciones.
                </p>
              </div>

              <div className="terms-section">
                <h3>8. Capacidad Máxima</h3>
                <p>
                  Cada espacio tiene una capacidad máxima permitida. Exceder esta capacidad es prohibido por razones
                  de seguridad y comodidad.
                </p>
              </div>

              <div className="terms-section">
                <h3>9. Aceptación de Términos</h3>
                <p>
                  Al realizar una reserva, el residente acepta completamente estos términos y condiciones y se
                  compromete a cumplir con todas las normas establecidas.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-close-modal"
                onClick={() => setShowTerms(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservasPage;
