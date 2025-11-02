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
    <div className="absolute z-10 flex w-full max-w-full flex-col h-[138px] left-0 right-0 top-[115px] px-[19px]">
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
          <button 
            className="absolute bottom-[5px] right-[11px] bg-white flex items-center gap-2.5 overflow-hidden w-8 h-8 p-2 rounded-[100px] hover:bg-gray-100 transition-colors z-10"
            aria-label="Apartment options"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/98238f5ab7f24cedac9541e87dab77e0b130f967?placeholderIfAbsent=true"
              alt=""
              className="aspect-[1] object-contain w-4 self-stretch my-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
