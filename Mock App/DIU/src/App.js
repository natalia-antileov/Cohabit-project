import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import VisitasPage from './pages/VisitasPage';
import ComunicadosPage from './pages/ComunicadosPage';
import PagosPage from './pages/PagosPage';
import ReservasPage from './pages/ReservasPage';
import PaymentMethodPage from './pages/PaymentMethodPage';

function App() {
  const [visits, setVisits] = useState([
    {
      id: '1',
      nombre: 'Mauricio Ramos',
      horaEntrada: '16:00',
      horaSalida: '20:00',
      fecha: '2024-11-11',
      fechaFormato: 'Mar, 11 de Noviembre',
      tipo: 'familia',
      patente: '',
      medio: 'apie',
      section: 'Mañana',
    },
    {
      id: '2',
      nombre: 'Xavier Lino',
      horaEntrada: '09:00',
      horaSalida: '12:00',
      fecha: '2024-11-12',
      fechaFormato: 'Mie, 12 de Noviembre',
      tipo: 'servicio',
      patente: 'LLWX26',
      medio: 'vehiculo',
      section: 'Miércoles, 12 de Noviembre',
    },
    {
      id: '3',
      nombre: 'Matías Gonzalez',
      horaEntrada: '14:00',
      horaSalida: '18:00',
      fecha: '2024-11-12',
      fechaFormato: 'Mie, 12 de Noviembre',
      tipo: 'familia',
      patente: '',
      medio: 'apie',
      section: 'Miércoles, 12 de Noviembre',
    },
  ]);

  const addVisit = (visit) => {
    setVisits([...visits, { ...visit, id: Date.now().toString() }]);
  };

  const updateVisit = (id, updatedVisit) => {
    setVisits(visits.map(v => v.id === id ? updatedVisit : v));
  };

  const deleteVisit = (id) => {
    setVisits(visits.filter(v => v.id !== id));
  };

  return (
    <Router>
      <div className="app">
        <div className="app-container">
          {/* Header */}
          <header className="header">
            <h1>DIU</h1>
          </header>

          {/* Main Content */}
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/reservas" element={<ReservasPage />} />
              <Route
                path="/visitas"
                element={
                  <VisitasPage
                    visits={visits}
                    onAddVisit={addVisit}
                    onUpdateVisit={updateVisit}
                    onDeleteVisit={deleteVisit}
                  />
                }
              />
              <Route path="/comunicados" element={<ComunicadosPage />} />
              <Route path="/pagos" element={<PagosPage />} />
              <Route path="/payment-method" element={<PaymentMethodPage />} />
            </Routes>
          </main>

          {/* Bottom Navigation */}
          <nav className="bottom-nav">
            <Link to="/reservas" className="nav-btn">
              <span className="nav-icon">📅</span>
              <span className="nav-label">Reservas</span>
            </Link>
            <Link to="/visitas" className="nav-btn">
              <span className="nav-icon">👥</span>
              <span className="nav-label">Visitas</span>
            </Link>
            <Link to="/" className="nav-btn">
              <span className="nav-icon">🏠</span>
              <span className="nav-label">Inicio</span>
            </Link>
            <Link to="/pagos" className="nav-btn">
              <span className="nav-icon">💰</span>
              <span className="nav-label">Pagos</span>
            </Link>
            <Link to="/comunicados" className="nav-btn">
              <span className="nav-icon">💬</span>
              <span className="nav-label">Comunicados</span>
            </Link>
          </nav>
        </div>
      </div>
    </Router>
  );
}

export default App;
