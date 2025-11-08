import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [selectedHour, setSelectedHour] = useState<string>(
    value ? value.split(':')[0] : '12'
  );
  const [selectedMinute, setSelectedMinute] = useState<string>(
    value ? value.split(':')[1] : '00'
  );

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
    onChange(`${hour}:${selectedMinute}`);
  };

  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute);
    onChange(`${selectedHour}:${minute}`);
  };

  return (
    <div className="flex gap-1 p-2 w-[180px]">
      <div className="flex-1">
        <div className="text-center text-xs font-medium mb-1 text-gray-700">Hora</div>
        <ScrollArea className="h-[160px] rounded-md border bg-white">
          <div className="p-0.5">
            {hours.map((hour) => (
              <button
                key={hour}
                onClick={() => handleHourSelect(hour)}
                className={`w-full px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors ${
                  selectedHour === hour
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'text-gray-700'
                }`}
              >
                {hour}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1">
        <div className="text-center text-xs font-medium mb-1 text-gray-700">Min</div>
        <ScrollArea className="h-[160px] rounded-md border bg-white">
          <div className="p-0.5">
            {minutes.map((minute) => (
              <button
                key={minute}
                onClick={() => handleMinuteSelect(minute)}
                className={`w-full px-2 py-1.5 text-sm rounded hover:bg-gray-100 transition-colors ${
                  selectedMinute === minute
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'text-gray-700'
                }`}
              >
                {minute}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
