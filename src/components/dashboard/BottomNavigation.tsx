import React, { useState } from 'react';
import { Calendar, Users, Home, DollarSign, MessageSquare } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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
      icon: Calendar
    },
    {
      id: 'visitas',
      label: 'Visitas',
      icon: Users
    },
    {
      id: 'inicio',
      label: 'Inicio',
      icon: Home,
      isSpecial: true
    },
    {
      id: 'pagos',
      label: 'Pagos',
      icon: DollarSign
    },
    {
      id: 'comunicados',
      label: 'Comunicados',
      icon: MessageSquare
    }
  ];

  const handleNavigate = (itemId: string) => {
    setActiveTab(itemId);
    onNavigate(itemId);
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const isActive = currentTab === item.id;
    const IconComponent = item.icon;
    
    if (item.isSpecial) {
      return (
        <div key={item.id} className="flex flex-col items-center w-[60px]">
          <button
            onClick={() => handleNavigate(item.id)}
            className="bg-[rgba(0,110,111,1)] flex min-h-[60px] w-[60px] items-center justify-center rounded-full hover:bg-[rgba(0,90,91,1)] transition-colors"
            aria-label={item.label}
          >
            <IconComponent className="w-8 h-8 text-white" />
          </button>
          <span className={`text-xs font-medium leading-none text-center mt-1 ${
            isActive ? 'text-[rgba(0,110,111,1)]' : 'text-[rgba(117,117,117,1)]'
          }`}>
            {item.label}
          </span>
        </div>
      );
    }

    return (
      <div key={item.id} className="flex flex-col items-center w-[75px]">
        <button
          onClick={() => handleNavigate(item.id)}
          className="hover:opacity-70 transition-opacity"
          aria-label={item.label}
        >
          <IconComponent className={`w-8 h-8 ${
            isActive ? 'text-[rgba(0,110,111,1)]' : 'text-[rgba(117,117,117,1)]'
          }`} />
        </button>
        <span className={`text-xs font-medium mt-1 ${
          isActive ? 'text-[rgba(0,110,111,1)]' : 'text-[rgba(117,117,117,1)]'
        }`}>
          {item.label}
        </span>
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
