# DIU MVP - Sistema de Gestión Condominial

Aplicación React funcional para gestionar visitas, comunicados y pagos en condominios.

## 🎯 Funcionalidades

### Meta 1: Registrar Visitas
- Formulario completo con validación
- Editar y eliminar visitas existentes
- Lista organizada por fecha

### Meta 2: Visualizar Comunicados
- Filtrado por categoría (Urgente, Mantenición, General)
- Filtrado en tiempo real
- Organizado por secciones

### Meta 3: Consultar Pagos
- Resumen visual de pagos
- Historial de cuotas mensuales
- Indicadores de estado (Pagado/Pendiente)

## 🚀 Quick Start

```bash
cd "...\Mock App\DIU"
npm install
npm start
```

App abrirá en `http://localhost:3000`

## 📁 Estructura

```
src/
├── App.js                    # Router principal
├── pages/                    # 4 páginas funcionales
│   ├── HomePage.js
│   ├── VisitasPage.js
│   ├── ComunicadosPage.js
│   └── PagosPage.js
└── components/               # Componentes reutilizables
    ├── VisitForm.js
    └── VisitsList.js
```

## 🛠️ Stack

- React 18
- React Router v6
- CSS3
- JavaScript ES6+

## ✅ Características

✅ CRUD completo de visitas
✅ Filtrado dinámico de comunicados
✅ Dashboard de pagos
✅ Validación de formularios
✅ Interfaz responsiva
✅ Datos de prueba incluidos

## 📝 Notas

- Frontend-only (sin backend)
- Datos en memoria (no persisten)
- Optimizado para móvil (480px)
- Listo para GitHub
