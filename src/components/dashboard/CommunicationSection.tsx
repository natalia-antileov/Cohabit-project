import React from 'react';

interface Communication {
  title: string;
  content: string;
  category: string;
  priority: 'normal' | 'urgent';
}

interface CommunicationSectionProps {
  communication: Communication;
  onViewAll: () => void;
}

export const CommunicationSection: React.FC<CommunicationSectionProps> = ({ 
  communication, 
  onViewAll 
}) => {
  const getPriorityBadge = () => {
    if (communication.priority === 'urgent') {
      return (
        <div className="bg-[rgba(223,170,170,1)] flex min-h-[31px] items-center gap-2.5 overflow-hidden text-sm text-[rgba(187,33,33,1)] whitespace-nowrap leading-none justify-center w-[103px] px-3 py-[9px] rounded-[50px]">
          <span className="self-stretch my-auto">Urgente</span>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="w-full mt-[30px]">
      <h2 className="text-[rgba(11,9,43,1)] text-base font-medium leading-none">
        Comunicados
      </h2>
      <div className="border min-h-[169px] w-full overflow-hidden mt-4 rounded-[10px] border-[rgba(237,237,237,1)] border-solid">
        <div className="flex w-full flex-col items-stretch font-medium justify-center px-3 py-4">
          <div className="flex w-full gap-[40px_46px] justify-between">
            <h3 className="text-[rgba(11,9,43,1)] text-base leading-4 w-[198px]">
              {communication.title}
            </h3>
            {getPriorityBadge()}
          </div>
        </div>
        <div className="bg-[rgba(237,237,237,1)] min-h-[105px] w-full text-[13px] px-3 py-4">
          <p className="text-[rgba(11,9,43,1)] font-normal leading-4">
            {communication.content}
          </p>
          <div className="flex w-full gap-[40px_100px] text-right leading-none justify-between mt-7">
            <span className="text-[rgba(117,117,117,1)] font-semibold">
              {communication.category}
            </span>
            <button 
              onClick={onViewAll}
              className="text-[rgba(0,110,111,1)] font-normal hover:underline transition-all"
            >
              Ver todos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
