import React from 'react';

interface ApartmentCardProps {
  apartmentName: string;
  backgroundImage: string;
}

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ 
  apartmentName, 
  backgroundImage 
}) => {
  return (
    <div className="absolute z-10 flex w-full max-w-full flex-col h-[120px] left-0 right-0 top-[70px] px-[19px]">
      <div className="bg-[rgba(49,40,40,1)] flex w-full h-[138px] flex-col overflow-hidden items-stretch rounded-[10px] relative">
        <img
          src={backgroundImage}
          alt="Apartment view"
          className="absolute h-full w-full object-cover inset-0 opacity-60"
        />
        <div className="flex relative w-full h-full justify-start items-end pb-[5px] px-[11px]">
          <h2 className="relative text-white text-base font-medium leading-none z-10">
            {apartmentName}
          </h2>
        </div>
      </div>
    </div>
  );
};
