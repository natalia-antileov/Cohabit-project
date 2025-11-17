import React from 'react';

interface Communication {
  title: string;
  content: string;
  category: string;
  priority: 'normal' | 'urgent';
  date?: string;
}

interface CommunicationSectionProps {
  communication: Communication;
  onViewAll: () => void;
}

export const CommunicationSection: React.FC<CommunicationSectionProps> = ({ 
  communication, 
  onViewAll 
}) => {
  const containerClasses = communication.priority === 'urgent' 
    ? "border-2 border-[rgba(220,38,38,1)]" 
    : "border border-[rgba(237,237,237,1)]";

  return (
    <section className="w-full mt-[30px]">
      <h2 className="text-[rgba(11,9,43,1)] text-base font-medium leading-none mb-4">
        Comunicados
      </h2>
      
      <div className={`${containerClasses} w-full overflow-hidden rounded-[10px] border-solid bg-white px-4 py-5`}>
        <div className="flex w-full justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {communication.title}
          </h3>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-[rgba(117,117,117,1)] text-sm">Hoy</span>
            <div className="flex gap-1 items-center">
              {communication.priority === 'urgent' && (
                <span className="text-[rgba(220,38,38,1)] text-sm font-semibold">
                  Urgente
                </span>
              )}
              <span className="text-[rgba(220,38,38,1)] text-sm">•</span>
              <span className="text-[rgba(220,38,38,1)] text-sm font-normal">
                {communication.category}
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-[rgba(11,9,43,1)] text-base leading-relaxed mb-4">
          {communication.content}
        </p>
        
        {communication.date && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(235,239,205,1)] rounded-full mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[rgba(139,145,93,1)]">
              <path d="M6 2V5M14 2V5M3 8H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
            </svg>
            <span className="text-[rgba(139,145,93,1)] text-sm">
              {communication.date}
            </span>
          </div>
        )}
        
        <div className="flex justify-end">
          <button 
            onClick={onViewAll}
            className="text-[rgba(0,110,111,1)] text-sm font-normal hover:underline transition-all"
          >
            Ver todos
          </button>
        </div>
      </div>
    </section>
  );
};
