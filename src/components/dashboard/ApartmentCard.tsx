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
    <div className="absolute z-0 flex w-[371px] max-w-full flex-col h-[213px] rounded-[10px] right-[19px] top-[109px]">
      <div className="bg-[rgba(49,40,40,1)] flex w-full flex-col overflow-hidden items-stretch justify-center py-px rounded-[10px]">
        <div className="flex flex-col relative aspect-[1.75] w-full gap-5 justify-between pt-[175px] pb-[5px] px-[11px] rounded-[10px]">
          <img
            src={backgroundImage}
            alt="Apartment view"
            className="absolute h-full w-full object-cover inset-0"
          />
          <h2 className="relative text-white text-base font-medium leading-none mt-[11px]">
            {apartmentName}
          </h2>
          <button 
            className="relative bg-white flex items-center gap-2.5 overflow-hidden w-8 h-8 p-2 rounded-[100px] hover:bg-gray-100 transition-colors"
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
