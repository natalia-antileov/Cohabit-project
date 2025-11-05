import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const cards = [
    { id: 'reservas', icon: '📅', label: 'Reservas', link: '/reservas' },
    { id: 'visitas', icon: '👥', label: 'Visitas', link: '/visitas' },
    { id: 'inicio', icon: '🏠', label: 'Inicio', link: '/' },
    { id: 'pagos', icon: '💰', label: 'Pagos', link: '/pagos' },
    { id: 'comunicados', icon: '💬', label: 'Comunicados', link: '/comunicados' },
  ];

  return (
    <div className="home-page">
      <div className="home-grid">
        {cards.map((card) => (
          <Link
            key={card.id}
            to={card.link}
            className={`home-card ${card.id === 'visitas' ? 'active' : ''}`}
          >
            <div className="card-icon">{card.icon}</div>
            <p className="card-label">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
