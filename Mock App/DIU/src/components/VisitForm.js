import React, { useState, useEffect } from 'react';
import './VisitForm.css';

function VisitForm({ onSubmit, editingVisit }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    tipo: 'familia',
    fecha: '',
    horaEntrada: '',
    horaSalida: '',
    medio: 'vehiculo',
    patente: '',
  });

  useEffect(() => {
    if (editingVisit) {
      const [nombre, apellido] = editingVisit.nombre.split(' ');
      setFormData({
        nombre: nombre || '',
        apellido: apellido || '',
        rut: '',
        tipo: editingVisit.tipo,
        fecha: editingVisit.fecha,
        horaEntrada: editingVisit.horaEntrada,
        horaSalida: editingVisit.horaSalida,
        medio: editingVisit.medio,
        patente: editingVisit.patente,
      });
    }
  }, [editingVisit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.rut ||
      !formData.fecha ||
      !formData.horaEntrada ||
      !formData.horaSalida
    ) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Validar patente solo si el medio es vehículo
    if (formData.medio === 'vehiculo' && !formData.patente) {
      alert('Por favor completa el campo de patente');
      return;
    }

    // Limpiar patente si el medio no es vehículo
    if (formData.medio !== 'vehiculo') {
      formData.patente = '';
    }

    onSubmit(formData);
    setFormData({
      nombre: '',
      apellido: '',
      rut: '',
      tipo: 'familia',
      fecha: '',
      horaEntrada: '',
      horaSalida: '',
      medio: 'vehiculo',
      patente: '',
    });
  };

  return (
    <form className="visit-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3 className="section-title">Información del visitante</h3>

        <div className="form-group">
          <label className="label">Nombre*</label>
          <input
            type="text"
            name="nombre"
            className="input"
            placeholder="Ej: Mauricio"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Apellido*</label>
          <input
            type="text"
            name="apellido"
            className="input"
            placeholder="Ej: Ramos"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Rut*</label>
          <input
            type="text"
            name="rut"
            className="input"
            placeholder="Ej: 12345678-9"
            value={formData.rut}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Tipo de visitante*</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="tipo"
                value="familia"
                checked={formData.tipo === 'familia'}
                onChange={handleChange}
              />
              <span className="radio-label">Familia/Amigos</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="tipo"
                value="servicio"
                checked={formData.tipo === 'servicio'}
                onChange={handleChange}
              />
              <span className="radio-label">Servicio Externo</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="tipo"
                value="otro"
                checked={formData.tipo === 'otro'}
                onChange={handleChange}
              />
              <span className="radio-label">Otro</span>
            </label>
          </div>
        </div>

        <label className="checkbox-option">
          <input type="checkbox" />
          <span className="checkbox-label">Guardar visitante para futuras visitas</span>
        </label>
      </div>

      <div className="form-section">
        <h3 className="section-title">Información de la visita</h3>

        <div className="form-group">
          <label className="label">Fecha*</label>
          <input
            type="date"
            name="fecha"
            className="input"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Hora de entrada*</label>
            <input
              type="time"
              name="horaEntrada"
              className="input"
              value={formData.horaEntrada}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Hora de salida*</label>
            <input
              type="time"
              name="horaSalida"
              className="input"
              value={formData.horaSalida}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label">Medio de llegada*</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="medio"
                value="vehiculo"
                checked={formData.medio === 'vehiculo'}
                onChange={handleChange}
              />
              <span className="radio-label">Vehículo</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="medio"
                value="apie"
                checked={formData.medio === 'apie'}
                onChange={handleChange}
              />
              <span className="radio-label">A pie</span>
            </label>
          </div>
        </div>

        {formData.medio === 'vehiculo' && (
          <div className="form-group">
            <label className="label">Patente*</label>
            <input
              type="text"
              name="patente"
              className="input"
              placeholder="Ej: NOPQ12"
              value={formData.patente}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit" className="btn-submit">
          {editingVisit ? 'Actualizar' : 'Registrar'}
        </button>
      </div>
    </form>
  );
}

export default VisitForm;
