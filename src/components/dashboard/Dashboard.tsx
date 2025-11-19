import React, { useState } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { ApartmentCard } from './ApartmentCard';
import { PaymentSection } from './PaymentSection';
import { CommunicationSection } from './CommunicationSection';
import { BottomNavigation } from './BottomNavigation';
import { PaymentsPage } from './PaymentsPage';
import { ReservationsPage } from './ReservationsPage';
import { VisitsPage } from './VisitorsPage';
import { CommunicationsPage } from './CommunicationsPage';

type PageType = 'inicio' | 'pagos' | 'reservas' | 'visitas' | 'comunicados';

export const Dashboard: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<PageType>('inicio');

  // Mock data - in a real app, this would come from API calls
  const userData = {
    name: 'Abner',
    apartment: 'Apartamento 4B - Torre Norte',
    apartmentImage: 'https://api.builder.io/api/v1/image/assets/TEMP/7f10aec2550e257ce355645862133c3e3d747f3e?placeholderIfAbsent=true'
  };

  const paymentData = {
    amount: '$326.000',
    status: 'overdue' as const,
    dueDate: 'Oct 30',
    period: 'Oct 2025',
    daysOverdue: 10
  };

  const communicationData = {
    title: 'Ascensor cerrado por mantención',
    content: 'Estimados residentes, les informamos que el ascensor estará cerrado hasta mediodía por mantenciones',
    category: 'Mantención',
    priority: 'urgent' as const
  };

  const handleNavigation = (itemId: string) => {
    setCurrentSection(itemId as PageType);
    console.log('Navigating to:', itemId);
  };

  const handleViewAllCommunications = () => {
    console.log('View all communications clicked');
    setCurrentSection('comunicados');
  };

  const handleGoToPayment = () => {
  setCurrentSection('pagos');
  };

  const renderHomePage = () => (
    <>
      <DashboardHeader userName={userData.name} />
      
      <ApartmentCard 
        apartmentName={userData.apartment}
        backgroundImage={userData.apartmentImage}
      />
      
      <div className="z-0 w-full px-[19px] pt-[60px] flex-1 flex flex-col justify-between pb-20">
        <div className="space-y-[15px]">
          <PaymentSection 
          payment={paymentData}
          onGoToPayment={handleGoToPayment}
          />
          <CommunicationSection 
            communication={communicationData}
            onViewAll={handleViewAllCommunications}
          />
        </div>
      </div>
    </>
  );

  const renderCurrentPage = () => {
    switch (currentSection) {
      case 'inicio':
        return renderHomePage();
      case 'pagos':
        return <PaymentsPage />;
      case 'reservas':
        return <ReservationsPage />;
      case 'visitas':
        return <VisitsPage />;
      case 'comunicados':
        return <CommunicationsPage />;
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="max-w-[480px] w-full mx-auto min-h-screen">
      <main className="bg-gray-50 relative flex min-h-screen w-full flex-col items-center pb-5 overflow-y-auto">
        {renderCurrentPage()}
        
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto">
          <BottomNavigation onNavigate={handleNavigation} activeTab={currentSection} />
        </div>
      </main>
    </div>
  );
};
