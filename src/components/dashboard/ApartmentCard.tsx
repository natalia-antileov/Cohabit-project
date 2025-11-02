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
    <div className="absolute z-0 flex w-full max-w-full flex-col h-[213px] rounded-[10px] left-0 right-0 top-[60px] px-[19px]">
      <div className="bg-[rgba(49,40,40,1)] flex w-[80%] h-full mx-auto flex-col overflow-hidden items-stretch justify-center">
        <div className="flex relative aspect-[1.75] w-full justify-between items-end pb-[5px] px-[11px]">
          <img
            src={backgroundImage}
            alt="Apartment view"
            className="absolute h-full w-[110%] object-cover inset-0 -left-[5%] opacity-60"
          />
          <h2 className="relative text-white text-base font-medium leading-none z-10">
            {apartmentName}
          </h2>
          <button 
            className="relative bg-white flex items-center gap-2.5 overflow-hidden w-8 h-8 p-2 rounded-[100px] hover:bg-gray-100 transition-colors z-10"
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
