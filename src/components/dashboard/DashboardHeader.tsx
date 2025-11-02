import React from 'react';

interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  return (
    <header className="bg-[rgba(0,110,111,1)] z-0 flex w-full flex-col overflow-hidden text-[32px] text-white font-extrabold leading-none pt-[54px] pb-[50px] px-[19px]">
      <h1 className="mb-[-31px]">
        Hola, {userName}
      </h1>
    </header>
  );
};
