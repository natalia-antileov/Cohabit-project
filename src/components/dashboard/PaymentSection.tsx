import React from 'react';

interface PaymentData {
  amount: string;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: string;
  period: string;
  daysOverdue?: number;
}

interface PaymentSectionProps {
  payment: PaymentData;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ payment }) => {
  const getStatusBadge = () => {
    switch (payment.status) {
      case 'pending':
        return (
          <div className="bg-[rgba(250,242,200,1)] self-stretch flex min-h-[31px] items-center gap-2.5 overflow-hidden text-sm text-[rgba(169,137,10,1)] font-medium justify-center w-[103px] my-auto px-3 py-[9px] rounded-[50px]">
            <span className="self-stretch my-auto">Pendiente</span>
          </div>
        );
      case 'overdue':
        return (
          <div className="bg-[rgba(223,170,170,1)] self-stretch flex min-h-[31px] items-center gap-2.5 overflow-hidden text-sm text-[rgba(187,33,33,1)] font-medium justify-center w-[103px] my-auto px-3 py-[9px] rounded-[50px]">
            <span className="self-stretch my-auto">Vencido</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full leading-none">
      <h2 className="text-[rgba(11,9,43,1)] text-base font-medium">
        Pagos pendientes o próximos
      </h2>
      <div className="border min-h-[169px] w-full overflow-hidden mt-4 rounded-[10px] border-[rgba(237,237,237,1)] border-solid">
        <div className="flex w-full items-center gap-[40px_83px] whitespace-nowrap justify-between flex-1 h-full px-3">
          <div className="text-black text-[32px] font-black self-stretch my-auto">
            {payment.amount}
          </div>
          {getStatusBadge()}
        </div>
        <div className="bg-[rgba(237,237,237,1)] w-full overflow-hidden font-medium px-3 py-4 rounded-[10px]">
          <div className="flex w-full gap-[40px_100px] justify-between">
            <div className="flex gap-2">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2f79892bb0e8262740a5880d686ae5e0c6a66b18?placeholderIfAbsent=true"
                alt=""
                className="aspect-[1] object-contain w-4 shrink-0"
              />
              <div className="flex flex-col items-stretch justify-center">
                <div className="text-black text-sm">
                  Fecha de pago
                </div>
                {payment.daysOverdue && (
                  <div className="text-[rgba(187,33,33,1)] text-[10px] mt-1">
                    Retrasado por {payment.daysOverdue} días
                  </div>
                )}
              </div>
            </div>
            <div className="text-black text-sm">
              {payment.dueDate}
            </div>
          </div>
          <div className="flex w-full items-center gap-[40px_100px] text-sm text-black justify-between mt-4">
            <div className="self-stretch flex items-center gap-2 my-auto">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/b3136d46d88cec3f553f17c36015c7e46b0af094?placeholderIfAbsent=true"
                alt=""
                className="aspect-[1] object-contain w-4 self-stretch shrink-0 my-auto"
              />
              <span className="self-stretch my-auto">
                Periodo de pago
              </span>
            </div>
            <div className="self-stretch my-auto">
              {payment.period}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
