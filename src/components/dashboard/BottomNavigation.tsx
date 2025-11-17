import React, { useState } from 'react';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  isSpecial?: boolean;
}

interface BottomNavigationProps {
  onNavigate: (itemId: string) => void;
  activeTab?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ onNavigate, activeTab: externalActiveTab }) => {
  const [activeTab, setActiveTab] = useState('inicio');
  
  const currentTab = externalActiveTab || activeTab;

  const navigationItems: NavigationItem[] = [
    {
      id: 'reservas',
      label: 'Reservas',
      icon: 'https://api.builder.io/api/v1/image/assets/TEMP/d19b20ff3dc3471d3331dd5bcc384df5ba604437?placeholderIfAbsent=true'
    },
    {
      id: 'visitas',
      label: 'Visitas',
      icon: 'https://api.builder.io/api/v1/image/assets/TEMP/6a5eeefd0345d43585288f443c80dc24792e6e28?placeholderIfAbsent=true'
    },
    {
      id: 'inicio',
      label: 'Inicio',
      icon: 'https://api.builder.io/api/v1/image/assets/TEMP/70fb8f7595518332ce4626a113736881b5625bd0?placeholderIfAbsent=true',
      isSpecial: true
    },
    {
      id: 'pagos',
      label: 'Pagos',
      icon: '$'
    },
    {
      id: 'comunicados',
      label: 'Comunicados',
      icon: 'https://api.builder.io/api/v1/image/assets/TEMP/45c23db16197bb79802eeb4b37c6d7439edd4980?placeholderIfAbsent=true'
    }
  ];

  const handleNavigate = (itemId: string) => {
    setActiveTab(itemId);
    onNavigate(itemId);
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = currentTab === item.id;
    const baseClasses = "flex flex-col items-center text-xs font-medium whitespace-nowrap leading-none";
    const activeClasses = isActive ? "text-[rgba(0,110,111,1)]" : "text-[rgba(117,117,117,1)]";
    
    if (item.isSpecial) {
      return (
        <div key={item.id} className="flex flex-col items-stretch w-[60px]">
          <button
            onClick={() => handleNavigate(item.id)}
            className={`self-center flex min-h-[60px] w-[60px] items-center gap-2.5 overflow-hidden justify-center h-[60px] px-[9px] rounded-[100px] transition-colors ${
              isActive 
                ? 'bg-[rgba(0,110,111,1)] hover:bg-[rgba(0,90,91,1)]' 
                : 'bg-[rgba(117,117,117,1)] hover:bg-[rgba(97,97,97,1)]'
            }`}
            aria-label={item.label}
          >
            <img
              src={item.icon}
              alt=""
              className="aspect-[1] object-contain w-8 self-stretch my-auto"
            />
          </button>
          <span className={`${activeClasses} text-xs font-medium leading-none text-center mt-1`}>
            {item.label}
          </span>
        </div>
      );
    }

    if (item.id === 'pagos') {
      return (
        <div key={item.id} className="flex flex-col items-center whitespace-nowrap leading-none w-[75px]">
          <button
            onClick={() => handleNavigate(item.id)}
            className={`flex min-h-8 w-8 flex-col items-center text-[23px] font-black justify-center h-8 px-[9px] rounded-[114px] transition-colors ${
              isActive 
                ? 'bg-[rgba(0,110,111,1)] text-white hover:bg-[rgba(0,90,91,1)]' 
                : 'bg-[rgba(117,117,117,1)] text-white hover:bg-[rgba(97,97,97,1)]'
            }`}
            aria-label={item.label}
          >
            <span>$</span>
          </button>
          <span className={`${activeClasses} text-xs font-medium mt-1`}>
            {item.label}
          </span>
        </div>
      );
    }

    return (
      <div key={item.id} className={`${baseClasses} ${activeClasses} w-[75px]`}>
        <button
          onClick={() => handleNavigate(item.id)}
          className="hover:opacity-70 transition-opacity"
          aria-label={item.label}
        >
          <img
            src={item.icon}
            alt=""
            className={`aspect-[1] object-contain w-8 transition-opacity ${isActive ? 'opacity-100' : 'opacity-50'}`}
          />
        </button>
        <span className="mt-1">{item.label}</span>
      </div>
    );
  };

  return (
    <nav 
      className="bg-white border-t border-gray-200 shadow-lg py-3 px-2" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="flex gap-1 justify-center items-center">
        {navigationItems.map(renderNavigationItem)}
      </div>
    </nav>
  );
};

// Demo
export default function Demo() {
  const [currentTab, setCurrentTab] = useState('inicio');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tab actual: {currentTab}</h1>
          <p className="text-gray-600">Haz clic en los íconos de navegación abajo</p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0">
        <BottomNavigation 
          onNavigate={(tabId) => setCurrentTab(tabId)}
          activeTab={currentTab}
        />
      </div>
    </div>
  );
}
