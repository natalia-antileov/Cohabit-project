# DIU MVP - Sistema de Gestión Condominial

Aplicación React funcional para gestionar visitas, comunicados, pagos, reservas y rendiciones en condominios.

## 🎯 Funcionalidades Principales

### 📝 Gestión de Visitas
- Formulario completo con validación
- Editar y eliminar visitas existentes
- Lista organizada por fecha

### 📢 Visualizar Comunicados
- Filtrado por categoría (Urgente, Mantenición, General)
- Filtrado en tiempo real
- Organizado por secciones

### 💰 Consultar Pagos
- Resumen visual de pagos
- Historial de cuotas mensuales
- Indicadores de estado (Pagado/Pendiente)

### 🏢 Panel Administrativo
- Gestión centralizada de datos
- Visualización de estadísticas

### 🏛️ Reservas de Espacios
- Sistema de reservas de áreas comunes
- Calendario de disponibilidad

### 📊 Rendición de Cuentas
- Reportes financieros
- Visualización de ingresos y gastos

### 💳 Métodos de Pago
- Configuración de múltiples métodos
- Procesamiento de pagos

## 🚀 Quick Start

```bash
cd "...\Mock App"
npm install
npm start
```

App abrirá en `http://localhost:3000`

## 📁 Estructura Completa del Proyecto

### Raíz del Proyecto
```
DIU/
├── .claude/                  # Configuración de Claude Code
├── .gitignore                # Archivos ignorados por Git
├── package.json              # Dependencias y scripts del proyecto
├── package-lock.json         # Lock de versiones de npm
├── README.md                 # Este archivo (documentación)
├── public/                   # Archivos estáticos
└── src/                      # Código fuente de la aplicación
```

### 📂 Carpeta `/public`
- **index.html** - Archivo HTML principal de la aplicación React

### 📂 Carpeta `/src` - Código Fuente Principal

#### Archivos Principales:
- **App.js** - Componente principal con routing y navegación
- **App.css** - Estilos globales de la aplicación
- **index.js** - Punto de entrada de React
- **index.css** - Estilos base CSS

#### 📂 `/src/components` - Componentes Reutilizables

Componentes funcionales que se reutilizan en diferentes páginas:

- **VisitForm.js / VisitForm.css**
  - Formulario para registrar nuevas visitas
  - Incluye validación de campos
  - Campos: fecha, hora, visitante, motivo, residente

- **VisitsList.js / VisitsList.css**
  - Componente para mostrar lista de visitas
  - Permite editar y eliminar visitas
  - Ordenado por fecha

#### 📂 `/src/pages` - Páginas de la Aplicación

Cada página es una vista completa accesible desde el navegador:

- **HomePage.js / HomePage.css**
  - Página principal/dashboard
  - Punto de entrada a todas las funcionalidades
  - Navegación principal

- **VisitasPage.js / VisitasPage.css**
  - Gestión completa de visitas
  - Integra VisitForm y VisitsList
  - CRUD de visitantes

- **ComunicadosPage.js / ComunicadosPage.css**
  - Visualización de comunicados condominiales
  - Filtrado por categoría (Urgente, Mantenición, General)
  - Filtrado en tiempo real

- **PagosPage.js / PagosPage.css**
  - Dashboard de pagos de cuotas
  - Historial de pagos por mes
  - Indicadores de estado (Pagado/Pendiente)

- **PaymentMethodPage.js / PaymentMethodPage.css**
  - Gestión de métodos de pago
  - Configuración de opciones de pago disponibles

- **AdminPanel.js / AdminPanel.css**
  - Panel administrativo centralizado
  - Acceso a todas las funcionalidades
  - Gestión avanzada de datos

- **ReservasPage.js / ReservasPage.css**
  - Sistema de reservas de áreas comunes
  - Calendario de disponibilidad
  - Gestión de reservas de espacios

- **RendicionPage.js / RendicionPage.css**
  - Reportes financieros del condominio
  - Visualización de ingresos y gastos
  - Estados de cuenta detallados

## 🛠️ Stack Tecnológico

- **React 18** - Librería de UI
- **React Router v6** - Navegación entre páginas
- **CSS3** - Estilos y diseño responsivo
- **JavaScript ES6+** - Lenguaje moderno

## ✅ Características Implementadas

✅ CRUD completo de visitas
✅ Filtrado dinámico de comunicados
✅ Dashboard de pagos funcional
✅ Validación de formularios
✅ Interfaz responsiva (móvil y desktop)
✅ Datos de prueba incluidos
✅ Panel administrativo
✅ Sistema de reservas
✅ Reportes financieros
✅ Métodos de pago configurables

## 📝 Notas de Desarrollo

- **Frontend-only** (sin backend integrado)
- **Datos en memoria** (no persisten entre recargas)
- **Optimizado para móvil** (responsive design desde 480px)
- **Listo para GitHub** y versionado
- Los datos se reinician al recargar la página
- Ideal para MVP y prototipado rápido

## 🔧 Scripts Disponibles

```bash
npm start        # Inicia servidor de desarrollo en puerto 3000
npm build        # Compila para producción
npm test         # Ejecuta pruebas
npm eject        # Expone configuración de react-scripts (irreversible)
```

## 📱 Compatibilidad

- Chrome, Firefox, Safari (últimas versiones)
- Responsive desde 480px hasta 4K
- Compatible con dispositivos móviles
