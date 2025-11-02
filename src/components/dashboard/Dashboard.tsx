import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { ApartmentCard } from './ApartmentCard';
import { PaymentSection } from './PaymentSection';
import { CommunicationSection } from './CommunicationSection';
import { BottomNavigation } from './BottomNavigation';

export const Dashboard: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('inicio');

  // Mock data - in a real app, this would come from API calls
  const userData = {
    name: 'Abner',
    apartment: 'Apartamento 4B - Torre Norte',
    apartmentImage: 'https://api.builder.io/api/v1/image/assets/TEMP/7f10aec2550e257ce355645862133c3e3d747f3e?placeholderIfAbsent=true'
  };

  const paymentData = {
    amount: '$300.0000',
    status: 'pending' as const,
    dueDate: 'Nov 30',
    period: 'Nov 2025',
    daysOverdue: 10
  };

  const communicationData = {
    title: 'Ascensor cerrado por mantención',
    content: 'Estimados residentes, les informamos que el ascensor estará cerrado hasta mediodía por mantenciones',
    category: 'Mantención',
    priority: 'urgent' as const
  };

  const handleNavigation = (itemId: string) => {
    setCurrentSection(itemId);
    console.log(`Navigating to: ${itemId}`);
  };

  const handleViewAllCommunications = () => {
    console.log('View all communications clicked');
    setCurrentSection('comunicados');
  };

  return (
    <div className="max-w-[480px] w-full mx-auto min-h-screen">
      <main className="bg-white relative flex h-screen w-full flex-col items-center justify-between pb-5 overflow-hidden">
        <DashboardHeader userName={userData.name} />
        
        <ApartmentCard 
          apartmentName={userData.apartment}
          backgroundImage={userData.apartmentImage}
        />
        
        <div className="z-0 w-full px-[19px] pt-[60px] flex-1 flex flex-col justify-between">
          <div className="space-y-[30px]">
            <PaymentSection payment={paymentData} />
            <CommunicationSection 
              communication={communicationData}
              onViewAll={handleViewAllCommunications}
            />
          </div>
        </div>
        
        <BottomNavigation onNavigate={handleNavigation} />
      </main>
    </div>
  );
};
